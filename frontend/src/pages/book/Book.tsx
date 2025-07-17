import { useNavigate, NavLink, useParams } from "react-router-dom";
import { useEffect } from "react";
import Header from "../../components/Header";
import { useTypingStore } from "../../store/typingStore";
import { books } from "../../mock/BookMock";

export default function Book() {
    const { bookId } = useParams<{ bookId: string }>();
    const navigate = useNavigate();

    const selectedBook = useTypingStore((state) => state.selectedBook);
    const setSelectedBook = useTypingStore((state) => state.setSelectedBook);
    const setSelectedChapter = useTypingStore(
        (state) => state.setSelectedChapter
    );
    const getCompletionPercentage = useTypingStore(
        (state) => state.getCompletionPercentage
    );
    const stats = useTypingStore((state) => state.stats);

    useEffect(() => {
        if (bookId && !selectedBook) {
            const book = books.find(
                (b) =>
                    b.titulo
                        .toLowerCase()
                        .replace(/\s+/g, "-")
                        .replace(/[^\w-]/g, "") === bookId
            );
            if (book) {
                setSelectedBook(book);
            }
        }
    }, [bookId, selectedBook, setSelectedBook]);

    if (!selectedBook) {
        return (
            <main className="min-h-screen ">
                <Header />
                <div className="text-white text-center mt-20 text-2xl">
                    <div className="animate-pulse">Loading book...</div>
                    <div className="mt-4">
                        <NavLink
                            to="/"
                            className="text-emerald-400 hover:text-emerald-300 transition-colors underline"
                        >
                            Go back to book selection
                        </NavLink>
                    </div>
                </div>
            </main>
        );
    }

    const handleChapterClick = (chapter: any) => {
        setSelectedChapter(chapter);
        const chapterId = chapter.id.toString();
        navigate(`/home/${bookId}/${chapterId}/typing-console`);
    };

    const completionPercentage = getCompletionPercentage();
    const completedChapters = Math.floor(stats.totalChaptersCompleted);

    return (
        <main className="min-h-screen">
            <Header />
            <div className="text-white mt-6 px-8">
                <nav className="flex items-center space-x-2 text-lg">
                    <NavLink
                        to="/"
                        className="text-emerald-400 hover:text-emerald-300 transition-colors"
                    >
                        Books
                    </NavLink>
                    <span className="text-gray-400">/</span>
                    <span className="text-gray-300">{selectedBook.titulo}</span>
                </nav>
            </div>

            <section className="flex justify-center items-center mt-10 text-white px-4">
                <div className="flex text-white p-6 gap-8 max-w-5xl w-full bg-zinc-900 rounded-xl shadow-2xl backdrop-blur-sm">
                    <div className="flex-1">
                        <h1 className="text-4xl font-bold text-white mb-2">
                            {selectedBook.titulo}
                        </h1>
                        <h2 className="text-2xl text-emerald-400 mb-4">
                            {selectedBook.autor}
                        </h2>
                        <p className="text-gray-300 mb-6 leading-relaxed">
                            {selectedBook.descricao}
                        </p>

                        <div className="grid grid-cols-2 gap-8 mb-6">
                            <div className="space-y-2">
                                <div className="text-lg text-emerald-400 font-semibold">
                                    Your Progress
                                </div>
                                <div className="text-2xl font-bold">
                                    {stats.wpm} WPM
                                </div>
                                <div className="text-lg">
                                    {Math.round(stats.accuracy)}% Accuracy
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="text-lg text-emerald-400 font-semibold">
                                    Book Progress
                                </div>
                                <div className="text-2xl font-bold">
                                    {completedChapters} /{" "}
                                    {selectedBook.totalCapitulos} Chapters
                                </div>
                                <div className="text-lg">
                                    {stats.totalPagesCompleted} /{" "}
                                    {selectedBook.totalPaginas} Pages
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                                <span className="text-emerald-400 font-semibold">
                                    Overall Progress
                                </span>
                                <span className="text-2xl font-bold text-emerald-400">
                                    {completionPercentage}%
                                </span>
                            </div>
                            <div className="w-full bg-zinc-800 rounded-full h-3">
                                <div
                                    className="bg-gradient-to-r from-emerald-500 to-emerald-400 h-3 rounded-full transition-all duration-700 ease-out"
                                    style={{
                                        width: `${completionPercentage}%`,
                                    }}
                                ></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="flex justify-center items-center mt-8 px-4 pb-8">
                <div className="max-w-4xl w-full">
                    <h3 className="text-white text-2xl font-bold mb-6 text-center">
                        Chapters
                    </h3>
                    <div data-cy="book-chapters" className="grid gap-4">
                        {selectedBook.capitulos.map((chapter, index) => {
                            const isCompleted = completedChapters > index;
                            return (
                                <div
                                    data-cy="chapter-item"
                                    key={chapter.id}
                                    className={`bg-gradient-to-r ${
                                        isCompleted
                                            ? "from-emerald-600 hover:to-emerald-600"
                                            : "bg-zinc-900 hover:bg-zinc-800"
                                    } flex justify-between items-center p-4 rounded-lg cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-xl`}
                                    onClick={() => handleChapterClick(chapter)}
                                >
                                    <div className="flex items-center space-x-4">
                                        <div
                                            className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                                                isCompleted
                                                    ? "bg-emerald-400 text-emerald-900"
                                                    : "bg-zinc-600 text-zinc-300"
                                            }`}
                                        >
                                            {isCompleted
                                                ? "✓"
                                                : chapter.capitulo}
                                        </div>
                                        <div>
                                            <div className="text-white font-semibold">
                                                {chapter.titulo}
                                            </div>
                                            <div className="text-gray-300 text-sm">
                                                {chapter.conteudo.slice(0, 100)}
                                                ...
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-white font-medium">
                                            {chapter.paginas} Pages
                                        </div>
                                        <div
                                            className={`text-sm ${
                                                isCompleted
                                                    ? "text-emerald-200"
                                                    : "text-gray-400"
                                            }`}
                                        >
                                            {isCompleted
                                                ? "Completed"
                                                : "Start Reading"}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>
        </main>
    );
}
