import { create } from "zustand";
import { bookAPI, type Book, type Chapter, type BooksResponse, type ChaptersResponse } from "../services/api";

export interface BookState {
    books: Book[];
    currentBook: Book | null;
    chapters: Chapter[];
    currentChapter: Chapter | null;
    loading: boolean;
    error: string | null;

    booksPage: number;
    booksTotal: number;
    chaptersPage: number;
    chaptersTotal: number;

    // chpter cache by book id
    chaptersByBookId: Record<number, Chapter[]>;

    loadBooks: (page?: number, search?: string) => Promise<void>;
    loadBookById: (bookId: number) => Promise<Book | null>;
    loadBookChapters: (bookId: number, page?: number) => Promise<void>;
    loadChapterById: (bookId: number, chapterId: number) => Promise<Chapter | null>;
    getChaptersForBook: (bookId: number) => Promise<Chapter[]>;
    setCurrentBook: (book: Book | null) => void;
    setCurrentChapter: (chapter: Chapter | null) => void;
    clearError: () => void;
}

export const useBookStore = create<BookState>((set, get) => ({
    books: [],
    currentBook: null,
    chapters: [],
    currentChapter: null,
    loading: false,
    error: null,
    booksPage: 1,
    booksTotal: 0,
    chaptersPage: 1,
    chaptersTotal: 0,
    chaptersByBookId: {},

    loadBooks: async (page = 1, search = '') => {
        set({ loading: true, error: null });
        
        try {
            const response: BooksResponse = await bookAPI.getBooks(page, 10, search);

          console.log(response);
            
            set({
                books: response.books,
                booksPage: response.page,
                booksTotal: response.total,
                loading: false,
            });
        } catch (error) {
            set({
                error: error instanceof Error ? error.message : 'Failed to load books',
                loading: false,
            });
        }
    },

    loadBookById: async (bookId: number) => {
        set({ loading: true, error: null });
        
        try {
            const book: Book = await bookAPI.getBookById(bookId);
            console.log(book)
            set({
                currentBook: book,
                loading: false,
            });
            
            return book;
        } catch (error) {
            set({
                error: error instanceof Error ? error.message : 'Failed to load book',
                loading: false,
            });
            return null;
        }
    },

    loadBookChapters: async (bookId: number, page = 1) => {
        set({ loading: true, error: null });
        
        try {
            const response: ChaptersResponse = await bookAPI.getBookChapters(bookId, page, 20);
            
            set((state) => ({
                chapters: response.chapters,
                chaptersPage: response.page,
                chaptersTotal: response.total,
                loading: false,
                // Cache chapters by book ID
                chaptersByBookId: {
                    ...state.chaptersByBookId,
                    [bookId]: response.chapters
                }
            }));
        } catch (error) {
            set({
                error: error instanceof Error ? error.message : 'Failed to load chapters',
                loading: false,
            });
        }
    },

    getChaptersForBook: async (bookId: number): Promise<Chapter[]> => {
        const state = get();
        
        // Return cached chapters if available
        if (state.chaptersByBookId[bookId]) {
            return state.chaptersByBookId[bookId];
        }
        
        // Otherwise load them
        await get().loadBookChapters(bookId);
        return get().chaptersByBookId[bookId] || [];
    },

    loadChapterById: async (bookId: number, chapterId: number) => {
        set({ loading: true, error: null });
        
        try {
            const chapter: Chapter = await bookAPI.getChapterById(bookId, chapterId);
            
            set({
                currentChapter: chapter,
                loading: false,
            });
            
            return chapter;
        } catch (error) {
            set({
                error: error instanceof Error ? error.message : 'Failed to load chapter',
                loading: false,
            });
            return null;
        }
    },

    setCurrentBook: (book: Book | null) => {
        set({ currentBook: book });
    },

    setCurrentChapter: (chapter: Chapter | null) => {
        set({ currentChapter: chapter });
    },

    clearError: () => {
        set({ error: null });
    },
}));
