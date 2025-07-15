import { useEffect, useRef, useState } from "react";
import { CharStateType } from "react-typing-game-hook";
import useTypingGame from "react-typing-game-hook";
import "./styles.css";
import { useTypingStore } from "../../../store/typingStore";

function TypingBox() {
  const currentText = useTypingStore((state) => state.currentText);
  const selectedBook = useTypingStore((state) => state.selectedBook);
  const selectedChapter = useTypingStore((state) => state.selectedChapter);
  const currentPageIndex = useTypingStore((state) => state.currentPageIndex);
  const updateStats = useTypingStore((state) => state.updateStats);
  const completeCurrentPage = useTypingStore(
    (state) => state.completeCurrentPage,
  );
  const goToNextPage = useTypingStore((state) => state.goToNextPage);
  const getTotalPages = useTypingStore((state) => state.getTotalPages);

  const [finished, setFinished] = useState(false);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const boxRef = useRef<HTMLDivElement>(null);

  const {
    states,
    actions: { insertTyping, resetTyping, deleteTyping, getDuration },
  } = useTypingGame(currentText, {
    skipCurrentWordOnSpace: false,
    countErrors: "once",
  });

  useEffect(() => {
    const duration = getDuration();
    if (duration > 0 && states.currIndex > 0) {
      const totalTyped = states.correctChar + states.errorChar;
      const currentAccuracy =
        totalTyped > 0
          ? Math.round((states.correctChar / totalTyped) * 100)
          : 100;

      const minutes = duration / 60000;
      const wordsTyped = states.currIndex / 5;
      let currentWpm = minutes > 0 ? wordsTyped / minutes : 0;
      currentWpm *= currentAccuracy / 100;
      currentWpm = Math.round(currentWpm);

      setWpm(currentWpm);
      setAccuracy(currentAccuracy);
      updateStats(currentWpm, currentAccuracy);
    }
  }, [
    states.correctChar,
    states.errorChar,
    states.currIndex,
    getDuration,
    updateStats,
  ]);

  useEffect(() => {
    boxRef.current?.focus();
    resetTyping();
    setFinished(false);
  }, [currentText, resetTyping]);

  useEffect(() => {
    if (!selectedBook || !selectedChapter) return;

    if (
      states.currIndex >= currentText.length - 1 &&
      currentText.length > 0 &&
      !finished
    ) {
      setFinished(true);
      completeCurrentPage();

      const timer = setTimeout(() => {
        const totalPages = getTotalPages();
        if (currentPageIndex < totalPages - 1) {
          goToNextPage();
          setFinished(false);
        } else {
          if (!goToNextPage()) {
            setFinished(true);
          } else {
            setFinished(false);
          }
        }
      }, 2000);

      return () => clearTimeout(timer);
    }

    if (states.currIndex < currentText.length - 1 && finished) {
      setFinished(false);
    }
  }, [
    states.currIndex,
    currentText.length,
    selectedBook,
    selectedChapter,
    currentPageIndex,
    completeCurrentPage,
    goToNextPage,
    getTotalPages,
    finished,
  ]);

  function handleKeyDown(e: React.KeyboardEvent) {
    e.preventDefault();
    const key = e.key;

    if (key === "Enter" && finished) {
        goToNextPage();
    }

    if (key === "Escape") {
      resetTyping();
      setWpm(0);
      setAccuracy(0);
      updateStats(0, 0);
      return;
    }

    if (key === "Backspace") {
      deleteTyping(false);
      return;
    }

    if (key.length === 1) {
      insertTyping(key);
    }
  }

  const progress = currentText.length > 0 ? (states.currIndex / currentText.length) * 100 : 0;

  if (!currentText) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-400 text-xl">Loading text...</div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      {/* Top Stats Bar - typelit.io style */}
      <div className="flex justify-between items-center mb-8 text-sm">
        <div className="flex space-x-6">
          <div className="flex items-center space-x-2">
            <span className="text-gray-500">WPM:</span>
            <span className="text-yellow-400 font-mono font-bold text-lg">
              {wpm}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-gray-500">Accuracy:</span>
            <span className="text-blue-400 font-mono font-bold text-lg">
              {accuracy}%
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-gray-500">Errors:</span>
            <span className="text-red-400 font-mono font-bold text-lg">
              {states.errorChar}
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-gray-500 text-xs">Progress:</span>
          <div className="w-32 h-2 bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-green-500  transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="text-gray-400 text-xs font-mono">
            {Math.ceil(progress)}%
          </span>
        </div>
      </div>

      <div className="relative">
        <div
          ref={boxRef}
          onKeyDown={handleKeyDown}
          tabIndex={0}
          className="typing-test relative text-xl leading-loose text-gray-600 font-mono p-8 rounded-2xl focus:outline-none transition-all duration-300 min-h-[200px] cursor-text"
          style={{ lineHeight: "1.5" }}
        >
          {currentText.split("").map((char: string, index: number) => {
            const state = states.charsState[index];
            const isCurrent = states.currIndex === index - 1;

            let className = "relative transition-all duration-150 ";

            if (isCurrent) {
              className += "bg-gray-700 text-white ";
            } else if (state === CharStateType.Correct) {
              className += "text-gray-300 ";
            } else if (state === CharStateType.Incorrect) {
              className += "text-red-400 bg-red-400/10 ";
            } else {
              className += "text-gray-600 ";
            }

            return (
              <span key={`${char}-${index}`} className={className}>
                {char === " " ? "\u00A0" : char}
              </span>
            );
          })}
        </div>

        {/* Completion overlay */}
        {finished && (
          <div className="absolute inset-0 bg-green-800/30 backdrop-blur-sm rounded-2xl flex items-center justify-center">
            <div className="text-center p-8">
              <div className="text-6xl mb-4">🎉</div>
              <h3 className="text-2xl font-bold text-white mb-2">
                Page Completed!
              </h3>
              <div className="text-gray-300 mb-4">
                <span className="text-yellow-400 font-bold">{wpm} WPM</span>
                <span className="mx-2">•</span>
                <span className="text-blue-400 font-bold">
                  {accuracy}% Accuracy
                </span>
              </div>
              <p className="text-gray-400">Moving to next page...</p>
            </div>
          </div>
        )}
      </div>

      <div className="mt-6 text-center">
        <p className="text-gray-500 text-sm">
          Start typing to begin • Press{" "}
          <kbd className="px-2 py-1 bg-gray-800 text-gray-300 rounded text-xs">
            ESC
          </kbd>{" "}
          to restart
        </p>
      </div>
    </div>
  );
}

export default TypingBox;
