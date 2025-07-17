import { useNavigate } from "react-router-dom";
import type { Livro } from "../mock/BookMock";
import { useTypingStore } from "../store/typingStore";

interface BookItemProps {
    book: Livro;
}

export default function BookItem({ book }: BookItemProps) {
    const navigate = useNavigate();
    const setSelectedBook = useTypingStore((state) => state.setSelectedBook);
    const getCompletionPercentage = useTypingStore(
        (state) => state.getCompletionPercentage
    );

    const handleClick = () => {
        setSelectedBook(book);
        const bookId = book.titulo
            .toLowerCase()
            .replace(/\s+/g, "-")
            .replace(/[^\w-]/g, "");
        navigate(`/home/${bookId}`);
    };

    const completionPercentage = getCompletionPercentage();

    return (
        <div
            className="flex justify-center cursor-pointer hover:scale-[1.02] transition-all duration-300"
            onClick={handleClick}
            data-cy="book-item"
        >
            <div className="relative w-full rounded-2xl bg-zinc-900 hover:bg-zinc-800 transition-all duration-300 p-6 flex flex-col justify-between">
                <div>
                    <span className="text-white text-xl font-semibold block mb-1">
                        {book.titulo}
                    </span>
                    <span className="text-zinc-300 text-sm font-light block mb-2">
                        {book.autor}
                    </span>
                    <span className="text-zinc-400 text-xs font-normal block mb-2">
                        {book.anoLancamento}
                    </span>
                    <span className="text-zinc-400 text-xs font-normal block">
                        {book.descricao.slice(0, 80)}...
                    </span>
                </div>
                <div className="mt-3">
                    {completionPercentage > 0 && (
                        <div className="mb-2">
                            <div className="flex justify-between items-center mb-1">
                                <span className="text-xs text-zinc-400">
                                    Progress
                                </span>
                                <span className="text-xs text-emerald-400 font-medium">
                                    {completionPercentage}%
                                </span>
                            </div>
                            <div className="w-full bg-zinc-600 rounded-full h-1.5">
                                <div
                                    className="bg-gradient-to-r from-emerald-500 to-emerald-400 h-1.5 rounded-full transition-all duration-500"
                                    style={{
                                        width: `${completionPercentage}%`,
                                    }}
                                ></div>
                            </div>
                        </div>
                    )}
                    <div className="flex justify-between items-center">
                        <span className="text-zinc-400 text-sm font-medium">
                            {book.totalCapitulos} Chapters
                        </span>
                        <span className="text-zinc-400 text-sm font-medium">
                            {book.totalPaginas} Pages
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
