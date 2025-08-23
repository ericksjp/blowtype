import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import { bookAPI, typingAPI, type Book, type Chapter, type Page } from "../services/api";
import { useBookStore } from "./bookStore";
import { useAuthStore } from "./authStore";
import type { TypingStateType } from "react-typing-game-hook";

export interface TypingStats {
  wpm: number;
  accuracy: number;
  totalChaptersCompleted: number;
  totalPagesCompleted: number;
  currentPage: number;
  completedPages: Set<string>;
}

export interface TypingState {
  selectedBook: Book | null;
  selectedChapter: Chapter | null;
  currentPageNumber: number;
  currentPage: Page | null;
  pages: Page[];

  typingStates: TypingStateType | null;
  currentText: string;
  isTypingActive: boolean;
  isChapterComplete: boolean;
  isPageComplete: boolean;
  isLoadingPage: boolean;

  stats: TypingStats;

  setSelectedBook: (book: Book | null) => void;
  setSelectedChapter: (chapter: Chapter | null) => Promise<void>;
  setCurrentPageNumber: (pageNumber: number) => Promise<void>;
  setTypingStates: (states: TypingStateType) => void;
  setCurrentText: (text: string) => void;
  setIsTypingActive: (active: boolean) => void;
  setIsChapterComplete: (complete: boolean) => void;
  setIsPageComplete: (complete: boolean) => void;
  updateStats: (wpm: number, accuracy: number) => void;
  completeCurrentPage: () => void;
  goToNextPage: () => Promise<boolean>;
  goToPreviousPage: () => Promise<boolean>;
  goToNextChapter: () => Promise<boolean>;
  resetTypingSession: () => void;
  getPageText: (pageNumber?: number) => string;
  getTotalPages: () => number;
  getCompletionPercentage: () => number;
  submitTypingResult: (
    wpm: number,
    accuracy: number,
    duration: number,
    errorsCount: number,
  ) => Promise<void>;
  loadChapterPages: (chapterId: number) => Promise<void>;
}

export const useTypingStore = create<TypingState>()(
  subscribeWithSelector((set, get) => ({
    selectedBook: null,
    selectedChapter: null,
    currentPageNumber: 1,
    currentPage: null,
    pages: [],
    typingStates: null,
    currentText: "",
    isTypingActive: false,
    isChapterComplete: false,
    isPageComplete: false,
    isLoadingPage: false,

    stats: {
      wpm: 0,
      accuracy: 0,
      totalChaptersCompleted: 0,
      totalPagesCompleted: 0,
      currentPage: 0,
      completedPages: new Set<string>(),
    },

    setSelectedBook: (book) => set({ selectedBook: book }),
    
    setSelectedChapter: async (chapter) => {
      set({ 
        selectedChapter: chapter,
        currentPageNumber: 1,
        currentPage: null,
        pages: [],
        currentText: "",
        isChapterComplete: false,
        isPageComplete: false,
      });

      if (chapter) {
        await get().loadChapterPages(chapter.id);
        await get().setCurrentPageNumber(1);
      }
    },

    loadChapterPages: async (chapterId: number) => {
      try {
        set({ isLoadingPage: true });
        const { selectedBook } = get();
        if (!selectedBook) return;

        const response = await bookAPI.getChapterPages(selectedBook.id, chapterId);
        set({ pages: response.pages });
      } catch (error) {
        console.error("Error loading chapter pages:", error);
        set({ pages: [] });
      } finally {
        set({ isLoadingPage: false });
      }
    },

    setCurrentPageNumber: async (pageNumber: number) => {
      try {
        set({ isLoadingPage: true });
        const { selectedBook, selectedChapter, pages } = get();
        
        if (!selectedBook || !selectedChapter) return;

        // First check if we have the page in our local cache
        const page = pages.find(p => p.pageNumber === pageNumber);
        
        if (page) {
          set({
            currentPageNumber: pageNumber,
            currentPage: page,
            currentText: page.content,
            isPageComplete: false,
          });
        } else {
          // Fetch the page from the API
          const fetchedPage = await bookAPI.getPageByNumber(selectedBook.id, selectedChapter.id, pageNumber);
          set({
            currentPageNumber: pageNumber,
            currentPage: fetchedPage,
            currentText: fetchedPage.content,
            isPageComplete: false,
          });
        }
      } catch (error) {
        console.error("Error setting current page:", error);
      } finally {
        set({ isLoadingPage: false });
      }
    },

    setTypingStates: (states) => set({ typingStates: states }),
    setCurrentText: (text) => set({ currentText: text }),
    setIsTypingActive: (active) => set({ isTypingActive: active }),
    setIsChapterComplete: (complete) => set({ isChapterComplete: complete }),
    setIsPageComplete: (complete) => set({ isPageComplete: complete }),

    updateStats: (wpm, accuracy) =>
      set((state) => ({
        stats: { ...state.stats, wpm, accuracy },
      })),

    completeCurrentPage: () =>
      set((state) => {
        const { selectedBook, selectedChapter, currentPageNumber } = state;
        if (!selectedBook || !selectedChapter) return state;

        const pageKey = `${selectedBook.title}-${selectedChapter.id}-${currentPageNumber}`;
        const newCompletedPages = new Set(state.stats.completedPages);
        newCompletedPages.add(pageKey);

        return {
          isPageComplete: true,
          stats: {
            ...state.stats,
            completedPages: newCompletedPages,
            totalPagesCompleted: newCompletedPages.size,
            currentPage: currentPageNumber,
          },
        };
      }),

    goToNextPage: async () => {
      const state = get();
      const totalPages = state.getTotalPages();

      if (state.currentPageNumber < totalPages) {
        const newPageNumber = state.currentPageNumber + 1;
        await get().setCurrentPageNumber(newPageNumber);
        return true;
      } else {
        // Try to go to next chapter
        return await get().goToNextChapter();
      }
    },

    goToPreviousPage: async () => {
      const state = get();

      if (state.currentPageNumber > 1) {
        const newPageNumber = state.currentPageNumber - 1;
        await get().setCurrentPageNumber(newPageNumber);
        return true;
      }
      return false;
    },

    goToNextChapter: async () => {
      const state = get();
      const { selectedBook, selectedChapter } = state;

      if (!selectedBook || !selectedChapter) return false;

      try {
        const { getChaptersForBook } = useBookStore.getState();
        const chapters = await getChaptersForBook(selectedBook.id);

        const currentChapterIndex = chapters.findIndex(
          (c: Chapter) => c.id === selectedChapter.id,
        );
        const nextChapter = chapters[currentChapterIndex + 1];

        if (nextChapter) {
          await get().setSelectedChapter(nextChapter);
          set((state) => ({
            stats: {
              ...state.stats,
              totalChaptersCompleted: state.stats.totalChaptersCompleted + 1,
            },
          }));
          return true;
        }

        set(() => ({
          isChapterComplete: true,
        }));
        return false;
      } catch (error) {
        console.error("Error fetching next chapter:", error);
        return false;
      }
    },

    resetTypingSession: () =>
      set({
        currentPageNumber: 1,
        typingStates: null,
        isTypingActive: false,
        isChapterComplete: false,
        isPageComplete: false,
      }),

    getPageText: (pageNumber) => {
      const state = get();
      if (pageNumber !== undefined) {
        const page = state.pages.find(p => p.pageNumber === pageNumber);
        return page?.content || "";
      }
      return state.currentPage?.content || "";
    },

    getTotalPages: () => {
      const state = get();
      return state.selectedChapter?.totalPages || state.pages.length || 0;
    },

    getCompletionPercentage: () => {
      const state = get();
      if (!state.selectedBook) return 0;

      const totalPages = state.selectedBook.totalPages;
      const completedPages = state.stats.completedPages.size;

      return Math.round((completedPages / totalPages) * 100);
    },

    submitTypingResult: async (
      wpm: number,
      accuracy: number,
      duration: number,
      errorsCount: number,
    ) => {
      const state = get();
      const { selectedBook, selectedChapter, currentPage } = state;
      const { user } = useAuthStore.getState();

      if (!selectedBook || !selectedChapter || !currentPage) {
        throw new Error("No book, chapter, or page selected");
      }

      // Only submit if user is authenticated
      if (!user) {
        console.log("Guest user - skipping result submission");
        return;
      }

      try {
        await typingAPI.submitResult({
          bookId: selectedBook.id,
          chapterId: selectedChapter.id,
          pageId: currentPage.id,
          pageNumber: currentPage.pageNumber,
          wpm,
          accuracy,
          duration,
          errorsCount,
        });
      } catch (error) {
        console.error("Error submitting typing result:", error);
        throw error;
      }
    },
  })),
);
