import type { User, TypingResult, TypingStats, Book, Chapter, Page } from '../types/index.js';
export declare class UserModel {
    static create(email: string, username: string, hashedPassword: string): User;
    static findByEmail(email: string): User | null;
    static findById(id: number): User | null;
    static updateLastLogin(id: number): void;
}
export declare class BookModel {
    static findAll(page?: number, limit?: number): {
        books: Book[];
        total: number;
        totalPages: number;
    };
    static findById(id: number): Book | null;
    static findByIdWithChapters(id: number): Book | null;
    static search(query: string, page?: number, limit?: number): {
        books: Book[];
        total: number;
        totalPages: number;
    };
}
export declare class ChapterModel {
    static findByBookId(bookId: number): Chapter[];
    static findById(id: number): Chapter | null;
    static findByIdWithPages(id: number): Chapter | null;
    static findByBookIdAndChapterNumber(bookId: number, chapterNumber: number): Chapter | null;
}
export declare class TypingResultModel {
    static create(result: Omit<TypingResult, 'id' | 'completedAt'>): TypingResult;
    static findById(id: number): TypingResult | null;
    static findByUserId(userId: number): TypingResult[];
    static getStatsByUserId(userId: number): TypingStats;
    static getStatsByUserIdAndBookId(userId: number, bookId: number): TypingStats;
}
export declare class PageModel {
    static findByChapterId(chapterId: number): Page[];
    static findById(id: number): Page | null;
    static findByChapterIdAndPageNumber(chapterId: number, pageNumber: number): Page | null;
}
