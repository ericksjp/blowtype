import BookItem from "./BookItem";
import domCasmurroCover from "../assets/images/domCasmurro.jpeg";

const books = [
    {
        cover: domCasmurroCover,
        title: "Dom Casmurro",
        author: "Machado de Assis",
        qtdPages: 346,
    },
    {
        cover: domCasmurroCover,
        title: "Dom Casmurro",
        author: "Machado de Assis",
        qtdPages: 346,
    },
    {
        cover: domCasmurroCover,
        title: "Dom Casmurro",
        author: "Machado de Assis",
        qtdPages: 346,
    },
    {
        cover: domCasmurroCover,
        title: "Dom Casmurro",
        author: "Machado de Assis",
        qtdPages: 346,
    },
    {
        cover: domCasmurroCover,
        title: "Dom Casmurro",
        author: "Machado de Assis",
        qtdPages: 346,
    },
    {
        cover: domCasmurroCover,
        title: "Dom Casmurro",
        author: "Machado de Assis",
        qtdPages: 346,
    },
    {
        cover: domCasmurroCover,
        title: "Dom Casmurro",
        author: "Machado de Assis",
        qtdPages: 346,
    },
    {
        cover: domCasmurroCover,
        title: "Dom Casmurro",
        author: "Machado de Assis",
        qtdPages: 346,
    },
];

export default function BookList() {
    return (
        <div className="mb-16 mx-4">
            <header className="bg-zinc-700 p-2 mb-4">
                <span className="text-white text-2xl">Available books</span>
            </header>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {books.map((book, index) => (
                    <BookItem
                        key={index}
                        cover={book.cover}
                        title={book.title}
                        author={book.author}
                        qtdPages={book.qtdPages}
                    />
                ))}
            </div>
        </div>
    );
}
