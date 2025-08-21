import  { createContext, useContext} from "react";
import type { TypingStateType } from "react-typing-game-hook";
import type { Livro, Capitulo } from "../mock/BookMock";

export interface TypingContextProps {
  text: string;
  wpm: number;
  accuracy: number;
  states: TypingStateType;
  handleKeyDown: (e: React.KeyboardEvent) => void;
  selectedBook: Livro | null;
  setSelectedBook: (book: Livro | null) => void;
  selectedChapter: Capitulo | null;
  setSelectedChapter: (chapter: Capitulo | null) => void;
}

export const TypingContext = createContext<TypingContextProps | undefined>(undefined);

export function useTypingContext() {
  const context = useContext(TypingContext);
  if (context === undefined) {
    throw new Error("useTypingContext must be used within a TypingProvider");
  }
  return context;
}
