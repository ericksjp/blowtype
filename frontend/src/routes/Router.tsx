import { Routes, Route } from "react-router-dom";
import Book from '../pages/book/Book';
import Home from "../pages/home/Home";
import TypingConsole from "../components/features/TypingConsole";
import Register from "../pages/register/Register";
import Login from "../pages/login/Login";
import Profile from "../pages/profile/Profile";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auth/register" element={<Register />} />
      <Route path="/auth/login" element={<Login/>} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/home/:bookId" element={<Book />} />
      <Route path="/home/:bookId/:pageId/typing-console" element={<TypingConsole />} />
      <Route path="/book" element={<Book />} />
    </Routes>
  );
}


