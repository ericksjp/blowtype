import { useEffect } from "react";
import BookItem from "./BookItem";
import { useBookStore } from "../store/bookStore";

export default function BookList() {
    const { books, loading, error, loadBooks } = useBookStore();

    useEffect(() => {
        loadBooks();
    }, [loadBooks]);

    if (loading) {
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
                <div className="flex justify-center items-center py-12">
                    <div className="text-zinc-300">Loading books...</div>
                </div>
            </div>
        );
    }

    if (error) {
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
                <div className="flex justify-center items-center py-12">
                    <div data-testid="book-error" className="text-red-400">Error loading books: {error}</div>
                </div>
            </div>
        );
    }

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
            <div
                data-cy="book-list"
                className="grid grid-cols-1 gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3"
            >
                {books.map((book) => (
                    <BookItem key={book.id} book={book} />
                ))}
            </div>
        </div>
    );
}
