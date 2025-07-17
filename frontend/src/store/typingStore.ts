import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import type { Livro, Capitulo } from "../mock/BookMock";
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
    selectedBook: Livro | null;
    selectedChapter: Capitulo | null;
    currentPageIndex: number;

    typingStates: TypingStateType | null;
    currentText: string;
    isTypingActive: boolean;
    isChapterComplete: boolean;
    isPageComplete: boolean;

    stats: TypingStats;

    setSelectedBook: (book: Livro | null) => void;
    setSelectedChapter: (chapter: Capitulo | null) => void;
    setCurrentPageIndex: (pageIndex: number) => void;
    setTypingStates: (states: TypingStateType) => void;
    setCurrentText: (text: string) => void;
    setIsTypingActive: (active: boolean) => void;
    setIsChapterComplete: (complete: boolean) => void;
    setIsPageComplete: (complete: boolean) => void;
    updateStats: (wpm: number, accuracy: number) => void;
    completeCurrentPage: () => void;
    goToNextPage: () => boolean;
    goToPreviousPage: () => boolean;
    goToNextChapter: () => boolean;
    resetTypingSession: () => void;
    getPageText: (pageIndex?: number) => string;
    getTotalPages: () => number;
    getCompletionPercentage: () => number;
}

const splitContentIntoPages = (
    content: string,
    wordsPerPage: number = 150
): string[] => {
    const words = content.split(" ");
    const pages: string[] = [];

    for (let i = 0; i < words.length; i += wordsPerPage) {
        const pageWords = words.slice(i, i + wordsPerPage);
        pages.push(pageWords.join(" "));
    }

    return pages.length > 0 ? pages : [content];
};

export const useTypingStore = create<TypingState>()(
    subscribeWithSelector((set, get) => ({
        selectedBook: null,
        selectedChapter: null,
        currentPageIndex: 0,
        typingStates: null,
        currentText: "",
        isTypingActive: false,
        isChapterComplete: false,
        isPageComplete: false,

        stats: {
            wpm: 0,
            accuracy: 0,
            totalChaptersCompleted: 0,
            totalPagesCompleted: 0,
            currentPage: 0,
            completedPages: new Set<string>(),
        },

        setSelectedBook: (book) => set({ selectedBook: book }),

        setSelectedChapter: (chapter) => {
            set({ selectedChapter: chapter });

            const newText = chapter
                ? splitContentIntoPages(chapter.conteudo)[0]
                : "";

            set({
                currentPageIndex: 0,
                currentText: newText,
                isChapterComplete: false,
                isPageComplete: false,
            });
        },

        setCurrentPageIndex: (pageIndex) =>
            set(() => {
                const newText = get().getPageText(pageIndex);
                return {
                    currentPageIndex: pageIndex,
                    currentText: newText,
                    isPageComplete: false,
                };
            }),

        setTypingStates: (states) => set({ typingStates: states }),
        setCurrentText: (text) => set({ currentText: text }),
        setIsTypingActive: (active) => set({ isTypingActive: active }),
        setIsChapterComplete: (complete) =>
            set({ isChapterComplete: complete }),
        setIsPageComplete: (complete) => set({ isPageComplete: complete }),

        updateStats: (wpm, accuracy) =>
            set((state) => ({
                stats: { ...state.stats, wpm, accuracy },
            })),

        completeCurrentPage: () =>
            set((state) => {
                const { selectedBook, selectedChapter, currentPageIndex } =
                    state;
                if (!selectedBook || !selectedChapter) return state;

                const pageKey = `${selectedBook.titulo}-${selectedChapter.id}-${currentPageIndex}`;
                const newCompletedPages = new Set(state.stats.completedPages);
                newCompletedPages.add(pageKey);

                return {
                    isPageComplete: true,
                    stats: {
                        ...state.stats,
                        completedPages: newCompletedPages,
                        totalPagesCompleted: newCompletedPages.size,
                        currentPage: currentPageIndex + 1,
                    },
                };
            }),

        goToNextPage: () => {
            const state = get();
            const totalPages = state.getTotalPages();

            if (state.currentPageIndex < totalPages - 1) {
                set((state) => ({
                    currentPageIndex: state.currentPageIndex + 1,
                    currentText: get().getPageText(state.currentPageIndex + 1),
                    isPageComplete: false,
                }));
                return true;
            } else {
                // Try to go to next chapter
                return get().goToNextChapter();
            }
        },

        goToPreviousPage: () => {
            const state = get();

            if (state.currentPageIndex > 0) {
                set((state) => ({
                    currentPageIndex: state.currentPageIndex - 1,
                    currentText: get().getPageText(state.currentPageIndex - 1),
                    isPageComplete: false,
                }));
                return true;
            }
            return false;
        },

        goToNextChapter: () => {
            const state = get();
            const { selectedBook, selectedChapter } = state;

            if (!selectedBook || !selectedChapter) return false;

            const currentChapterIndex = selectedBook.capitulos.findIndex(
                (c) => c.id === selectedChapter.id
            );
            const nextChapter = selectedBook.capitulos[currentChapterIndex + 1];

            if (nextChapter) {
                set(() => ({
                    selectedChapter: nextChapter,
                    currentPageIndex: 0,
                    currentText: get().getPageText(0),
                    isChapterComplete: false,
                    isPageComplete: false,
                    stats: {
                        ...get().stats,
                        totalChaptersCompleted:
                            get().stats.totalChaptersCompleted + 1,
                    },
                }));
                return true;
            }

            // Mark chapter as complete if it's the last one
            set((state) => ({
                isChapterComplete: true,
            }));
            return false;
        },

        resetTypingSession: () =>
            set({
                currentPageIndex: 0,
                typingStates: null,
                isTypingActive: false,
                isChapterComplete: false,
                isPageComplete: false,
                currentText: get().getPageText(0),
            }),

        getPageText: (pageIndex = 0) => {
            const state = get();
            if (!state.selectedChapter) return "";

            const pages = splitContentIntoPages(state.selectedChapter.conteudo);
            return pages[pageIndex] || "";
        },

        getTotalPages: () => {
            const state = get();
            if (!state.selectedChapter) return 0;

            const pages = splitContentIntoPages(state.selectedChapter.conteudo);
            return pages.length;
        },

        getCompletionPercentage: () => {
            const state = get();
            if (!state.selectedBook) return 0;

            const totalPages = state.selectedBook.totalPaginas;
            const completedPages = state.stats.completedPages.size;

            return Math.round((completedPages / totalPages) * 100);
        },
    }))
);
