import BookItem from "./BookItem";
import { books } from "../mock/BookMock";

export default function BookList() {
  return (
    <div className="mb-16 mx-4">
      <header className="p-4 mb-6 rounded-t-md">
        <span className="text-white text-3xl font-bold tracking-wide">
          Available Books
        </span>
        <p className="text-zinc-300 text-sm mt-2">
          Choose a book to start practicing your typing skills
        </p>
      </header>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
        {books.map((book, index) => (
          <BookItem key={index} book={book} />
        ))}
      </div>
    </div>
  );
}
