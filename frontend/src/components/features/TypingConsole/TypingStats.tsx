import { useTypingStore } from "../../../store/typingStore";

export default function TypingStats() {
  const selectedBook = useTypingStore((state) => state.selectedBook);
  const selectedChapter = useTypingStore((state) => state.selectedChapter);
  const currentPageIndex = useTypingStore((state) => state.currentPageIndex);
  const getTotalPages = useTypingStore((state) => state.getTotalPages);

  // Find chapter index for display
  let chapterNumber = 0;
  if (selectedBook && selectedChapter) {
    chapterNumber = selectedBook.capitulos.findIndex(c => c.id === selectedChapter.id) + 1;
  }

  const totalPages = getTotalPages();

  return (
    <div className="max-w-4xl mx-auto px-6 mb-6">
      {/* Minimal header info like typelit.io */}
      <div className="flex justify-between items-center text-sm text-gray-400 mb-4">
        <div className="flex items-center space-x-4">
          <span className="text-gray-300 font-medium">
            {selectedChapter ? selectedChapter.titulo : "No chapter selected"}
          </span>
          <span className="text-gray-500">•</span>
          <span>
            Chapter {chapterNumber} of {selectedBook?.capitulos.length || 0}
          </span>
          <span className="text-gray-500">•</span>
          <span>
            Page {currentPageIndex + 1} of {totalPages}
          </span>
        </div>
        
        <div className="text-gray-500 text-xs">
          {selectedBook?.autor}
        </div>
      </div>
    </div>
  );
}

