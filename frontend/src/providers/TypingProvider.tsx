import React, { useEffect, useState, useRef } from "react";
import { getWpmWorker, getPrecisionWorker } from "../workers";
import type { CalculateWPMWorkerMessage } from "../workers/WpmWorker";
import type { CalculatePrecisionWorkerMessage } from "../workers/PrecisionWorker";

import { TypingContext } from "../contexts/TypingContext";
import useTypingGame from "react-typing-game-hook";
import type { Livro, Capitulo } from "../mock/BookMock";

interface TypingProviderProps {
  children?: React.ReactNode;
}

function TypingLogicProvider({
  children,
  text,
  // typingKey,
  selectedBook,
  setSelectedBook,
  selectedChapter,
  setSelectedChapter,
}: any) {
  const [wpm, setWpmData] = useState<number>(0);
  const [accuracy, setAccurracy] = useState<number>(0);

  const {
    states,
    actions: { insertTyping, resetTyping, deleteTyping, getDuration },
  } = useTypingGame(text, {
    skipCurrentWordOnSpace: false,
    countErrors: "once",
  });

  function handleKeyDown(e: React.KeyboardEvent) {
    e.preventDefault();
    const key = e.key;

    if (key === "Escape") {
      resetTyping();
      return;
    }
    if (key === "Backspace") {
      calculateWpm({ good: states.correctChar, bad: states.errorChar, timePassedInMilliseconds: getDuration() });
      deleteTyping(false);
      return;
    }
    if (key.length === 1) {
      calculateWpm({ good: states.correctChar, bad: states.errorChar, timePassedInMilliseconds: getDuration() });
      calculateAccuracy({ good: states.correctChar, bad: states.errorChar });
      insertTyping(key);
    }
  }

  useEffect(() => {
    const wpmWorker = getWpmWorker();
    const precisionWorker = getPrecisionWorker();

    wpmWorker.onmessage = (event) => setWpmData(event.data);
    precisionWorker.onmessage = (event) => setAccurracy(event.data);

    return () => {
      wpmWorker?.terminate();
      precisionWorker?.terminate();
    };
  }, []);

  function calculateWpm(message: CalculateWPMWorkerMessage) {
    return getWpmWorker().postMessage(message);
  }

  function calculateAccuracy(message: CalculatePrecisionWorkerMessage) {
    return getPrecisionWorker().postMessage(message);
  }

  return (
    <TypingContext.Provider
      value={{
        wpm,
        accuracy,
        handleKeyDown,
        states,
        text,
        selectedBook,
        setSelectedBook,
        selectedChapter,
        setSelectedChapter,
      }}
    >
      {children}
    </TypingContext.Provider>
  );
}

export default function TypingProvider({ children }: TypingProviderProps) {
  const [selectedBook, setSelectedBook] = useState<Livro | null>(null);
  const [selectedChapter, setSelectedChapter] = useState<Capitulo | null>(null);
  const text = selectedChapter?.conteudo || "";

  const [typingKey, setTypingKey] = useState(0);
  const prevTextRef = useRef("");

  useEffect(() => {
    if (text !== prevTextRef.current) {
      setTypingKey((k) => k + 1);
      prevTextRef.current = text;
    }
  }, [text]);

  return (
    <TypingLogicProvider
      key={typingKey}
      text={text}
      typingKey={typingKey}
      selectedBook={selectedBook}
      setSelectedBook={setSelectedBook}
      selectedChapter={selectedChapter}
      setSelectedChapter={setSelectedChapter}
    >
      {children}
    </TypingLogicProvider>
  );
}

