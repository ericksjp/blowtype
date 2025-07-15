import { Routes, Route } from "react-router-dom";
import Book from '../pages/book/Book';
import Home from "../pages/home/Home";
import TypingConsole from "../components/features/TypingConsole";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home/:bookId" element={<Book />} />
      <Route path="/home/:bookId/:pageId/typing-console" element={<TypingConsole />} />
      <Route path="/book" element={<Book />} />
    </Routes>
  );
}


