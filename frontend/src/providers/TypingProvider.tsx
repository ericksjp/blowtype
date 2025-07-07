import React, {  useEffect, useState } from "react";
import { getWpmWorker, getPrecisionWorker } from "../workers"
import type { CalculateWPMWorkerMessage } from "../workers/WpmWorker"
import type { CalculatePrecisionWorkerMessage } from "../workers/PrecisionWorker"

import { TypingContext } from "../contexts/TypingContext";
import useTypingGame from "react-typing-game-hook";

interface WorkerProviderProps {
  children?: React.ReactNode;
  text: string;
}

export default function TypingProvider({ children, text }: WorkerProviderProps) {
  const [wpm, setWpmData] = useState<number>(0);
  const [accuracy, setAccurracy] = useState<number>(0);

  const {
    states,
    actions: { insertTyping, resetTyping, deleteTyping, getDuration },
  } = useTypingGame(text, {
    skipCurrentWordOnSpace: false,
    countErrors: "once"
  });

  function handleKeyDown(e: React.KeyboardEvent) {
    e.preventDefault();
    const key = e.key;

    if (key === "Escape") {
      resetTyping();
      return;
    }
    if (key === "Backspace") {
      calculateWpm({good: states.correctChar, bad: states.errorChar, timePassedInMilliseconds: getDuration()});
      deleteTyping(false);
      return;
    }
    if (key.length === 1) {
      calculateWpm({good: states.correctChar, bad: states.errorChar, timePassedInMilliseconds: getDuration()});
      calculateAccuracy({good: states.correctChar, bad: states.errorChar});
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
    <TypingContext.Provider value={{wpm, accuracy, handleKeyDown, states, text}}>
        {children}
    </TypingContext.Provider>
  )
}

