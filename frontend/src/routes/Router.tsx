import { Routes , Route } from "react-router-dom";
import Book from '../pages/book/Book';
import Home from "../pages/home/Home";
import TypingConsole from "../components/features/TypingConsole";

const text = "Sheriff John Brown always hated me For what, I don't know Every time I plant a seed He said kill it before it grow He said kill them before they grow";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/book" element={<Book/>}/>
      <Route path="/typingConsole" element={<TypingConsole text={text}/>}/>
    </Routes>
  );
}


