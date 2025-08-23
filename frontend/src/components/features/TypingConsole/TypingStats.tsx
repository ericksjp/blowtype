import { useTypingStore } from "../../../store/typingStore";
import { useBookStore } from "../../../store/bookStore";

export default function TypingStats() {
  const selectedBook = useTypingStore((state) => state.selectedBook);
  const selectedChapter = useTypingStore((state) => state.selectedChapter);
  const currentPageNumber = useTypingStore((state) => state.currentPageNumber);
  const getTotalPages = useTypingStore((state) => state.getTotalPages);
  
  // Get chapters from book store
  const { chaptersByBookId } = useBookStore();

  // Find chapter index for display
  let chapterNumber = 0;
  let totalChapters = 0;
  
  if (selectedBook && selectedChapter) {
    const chapters = chaptersByBookId[selectedBook.id] || [];
    chapterNumber = chapters.findIndex(c => c.id === selectedChapter.id) + 1;
    totalChapters = chapters.length;
  }

  const totalPages = getTotalPages();

  return (
    <div className="max-w-4xl mx-auto px-6 mb-6">
      {/* Minimal header info like typelit.io */}
      <div className="flex justify-between items-center text-sm text-gray-400 mb-4">        <div className="flex items-center space-x-4">
          <span className="text-gray-300 font-medium">
            {selectedChapter ? selectedChapter.title : "No chapter selected"}
          </span>
          <span className="text-gray-500">•</span>
          <span>
            Chapter {chapterNumber} of {totalChapters}
          </span>
          <span className="text-gray-500">•</span>
          <span>
            Page {currentPageNumber} of {totalPages}
          </span>
        </div>        
        <div className="text-gray-500 text-xs">
          {selectedBook?.author}
        </div>
      </div>
    </div>
  );
}

