import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import "./styles.css";
import TypingStats from "./TypingStats";
import TypingBox from "./TypingBox";
import Header from "../../Header";
import { useTypingStore } from "../../../store/typingStore";
import { books } from "../../../mock/BookMock";

function TypingConsole() {
  const { bookId, pageId } = useParams<{ bookId: string; pageId: string }>();
  const navigate = useNavigate();
  
  const selectedBook = useTypingStore((state) => state.selectedBook);
  const selectedChapter = useTypingStore((state) => state.selectedChapter);
  const currentPageIndex = useTypingStore((state) => state.currentPageIndex);
  const setSelectedBook = useTypingStore((state) => state.setSelectedBook);
  const setSelectedChapter = useTypingStore((state) => state.setSelectedChapter);
  const goToPreviousPage = useTypingStore((state) => state.goToPreviousPage);
  const goToNextPage = useTypingStore((state) => state.goToNextPage);
  const resetTypingSession = useTypingStore((state) => state.resetTypingSession);
  const getTotalPages = useTypingStore((state) => state.getTotalPages);

  useEffect(() => {
    if (bookId && pageId) {
      if (!selectedBook) {
        const book = books.find(b => 
          b.titulo.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '') === bookId
        );
        if (book) {
          setSelectedBook(book);
        }
      }
      
      if (selectedBook && !selectedChapter) {
        const chapter = selectedBook.capitulos.find(c => c.id.toString() === pageId);
        if (chapter) {
          setSelectedChapter(chapter);
        }
      }
    }
  }, [bookId, pageId, selectedBook, selectedChapter, setSelectedBook, setSelectedChapter]);

  const handleBackToChapters = () => {
    navigate(`/home/${bookId}`);
  };

  const handlePreviousPage = () => {
    if (!goToPreviousPage()) {
      handleBackToChapters();
    }
  };

  const handleNextPage = () => {
    if (!goToNextPage()) {
      handleBackToChapters();
    }
  };

  const handleRestart = () => {
    resetTypingSession();
  };

  if (!selectedBook || !selectedChapter) {
    return (
      <div className="min-h-screen bg-gray-900">
        <Header />
        <div className="flex items-center justify-center h-96">
          <div className="text-gray-400 text-xl animate-pulse">Loading...</div>
        </div>
      </div>
    );
  }

  const totalPages = getTotalPages();

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Clean navigation bar like typelit.io */}
      <div className="border-b">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <button
              onClick={handleBackToChapters}
              className="text-gray-400 hover:text-white transition-colors text-sm flex items-center space-x-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span>Back to Chapters</span>
            </button>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={handleRestart}
                className="text-gray-400 hover:text-white transition-colors text-sm flex items-center space-x-1"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <span>Restart</span>
              </button>
              
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <button
                  onClick={handlePreviousPage}
                  disabled={currentPageIndex === 0}
                  className="p-1 text-gray-400 hover:text-white disabled:text-gray-600 disabled:cursor-not-allowed transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                
                <span className="px-2 py-1 bg-gray-800 rounded text-xs font-mono">
                  {currentPageIndex} / {totalPages}
                </span>
                
                <button
                  onClick={handleNextPage}
                  className="p-1 text-gray-400 hover:text-white transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="py-8">
        <TypingStats />
        <TypingBox />
      </div>
    </div>
  );
}

export default TypingConsole;
