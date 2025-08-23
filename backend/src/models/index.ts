import db from '../config/database.js';
import type { User, TypingResult, TypingStats, Book, Chapter, Page } from '../types/index.js';

export class UserModel {
  static create(email: string, username: string, hashedPassword: string): User {
    const stmt = db.prepare(`
      INSERT INTO users (email, username, password)
      VALUES (?, ?, ?)
    `);
    
    const result = stmt.run(email, username, hashedPassword);
    
    return this.findById(result.lastInsertRowid as number)!;
  }

  static findByEmail(email: string): User | null {
    const stmt = db.prepare('SELECT * FROM users WHERE email = ?');
    return stmt.get(email) as User | null;
  }

  static findById(id: number): User | null {
    const stmt = db.prepare('SELECT * FROM users WHERE id = ?');
    return stmt.get(id) as User | null;
  }

  static updateLastLogin(id: number): void {
    const stmt = db.prepare('UPDATE users SET updated_at = CURRENT_TIMESTAMP WHERE id = ?');
    stmt.run(id);
  }
}

export class BookModel {
  static findAll(page: number = 1, limit: number = 10): { books: Book[], total: number, totalPages: number } {
    const offset = (page - 1) * limit;
    
    const countStmt = db.prepare('SELECT COUNT(*) as count FROM books');
    const { count } = countStmt.get() as { count: number };
    
    const stmt = db.prepare(`
      SELECT 
        id,
        title,
        author,
        year_published as yearPublished,
        description,
        total_chapters as totalChapters,
        total_pages as totalPages,
        created_at as createdAt
      FROM books 
      ORDER BY created_at DESC 
      LIMIT ? OFFSET ?
    `);
    
    const books = stmt.all(limit, offset) as Book[];
    
    return {
      books,
      total: count,
      totalPages: Math.ceil(count / limit)
    };
  }

  static findById(id: number): Book | null {
    const stmt = db.prepare(`
      SELECT 
        id,
        title,
        author,
        year_published as yearPublished,
        description,
        total_chapters as totalChapters,
        total_pages as totalPages,
        created_at as createdAt
      FROM books 
      WHERE id = ?
    `);
    
    return stmt.get(id) as Book | null;
  }

  static findByIdWithChapters(id: number): Book | null {
    const book = this.findById(id);
    if (!book) return null;
    
    const chapters = ChapterModel.findByBookId(id);
    return { ...book, chapters };
  }

  static search(query: string, page: number = 1, limit: number = 10): { books: Book[], total: number, totalPages: number } {
    const offset = (page - 1) * limit;
    const searchPattern = `%${query}%`;
    
    const countStmt = db.prepare(`
      SELECT COUNT(*) as count FROM books 
      WHERE title LIKE ? OR author LIKE ? OR description LIKE ?
    `);
    const { count } = countStmt.get(searchPattern, searchPattern, searchPattern) as { count: number };
    
    const stmt = db.prepare(`
      SELECT 
        id,
        title,
        author,
        year_published as yearPublished,
        description,
        total_chapters as totalChapters,
        total_pages as totalPages,
        created_at as createdAt
      FROM books 
      WHERE title LIKE ? OR author LIKE ? OR description LIKE ?
      ORDER BY created_at DESC 
      LIMIT ? OFFSET ?
    `);
    
    const books = stmt.all(searchPattern, searchPattern, searchPattern, limit, offset) as Book[];
    
    return {
      books,
      total: count,
      totalPages: Math.ceil(count / limit)
    };
  }
}

export class ChapterModel {
  static findByBookId(bookId: number): Chapter[] {
    const stmt = db.prepare(`
      SELECT 
        id,
        book_id as bookId,
        chapter_number as chapterNumber,
        title,
        total_pages as totalPages
      FROM chapters 
      WHERE book_id = ?
      ORDER BY chapter_number
    `);
    
    return stmt.all(bookId) as Chapter[];
  }

  static findById(id: number): Chapter | null {
    const stmt = db.prepare(`
      SELECT 
        id,
        book_id as bookId,
        chapter_number as chapterNumber,
        title,
        total_pages as totalPages
      FROM chapters 
      WHERE id = ?
    `);
    
    return stmt.get(id) as Chapter | null;
  }

  static findByIdWithPages(id: number): Chapter | null {
    const chapter = this.findById(id);
    if (!chapter) return null;
    
    const pages = PageModel.findByChapterId(id);
    return { ...chapter, pages };
  }

  static findByBookIdAndChapterNumber(bookId: number, chapterNumber: number): Chapter | null {
    const stmt = db.prepare(`
      SELECT 
        id,
        book_id as bookId,
        chapter_number as chapterNumber,
        title,
        total_pages as totalPages
      FROM chapters 
      WHERE book_id = ? AND chapter_number = ?
    `);
    
    return stmt.get(bookId, chapterNumber) as Chapter | null;
  }
}

export class TypingResultModel {
  static create(result: Omit<TypingResult, 'id' | 'completedAt'>): TypingResult {
    const stmt = db.prepare(`
      INSERT INTO typing_results (user_id, book_id, chapter_id, page_id, page_number, wpm, accuracy, duration, errors_count)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    
    const insertResult = stmt.run(
      result.userId,
      result.bookId,
      result.chapterId,
      result.pageId,
      result.pageNumber,
      result.wpm,
      result.accuracy,
      result.duration,
      result.errorsCount
    );
    
    return this.findById(insertResult.lastInsertRowid as number)!;
  }

  static findById(id: number): TypingResult | null {
    const stmt = db.prepare(`
      SELECT 
        id,
        user_id as userId,
        book_id as bookId,
        chapter_id as chapterId,
        page_id as pageId,
        page_number as pageNumber,
        wpm,
        accuracy,
        duration,
        errors_count as errorsCount,
        completed_at as completedAt
      FROM typing_results 
      WHERE id = ?
    `);
    return stmt.get(id) as TypingResult | null;
  }

  static findByUserId(userId: number): TypingResult[] {
    const stmt = db.prepare(`
      SELECT 
        tr.id,
        tr.user_id as userId,
        tr.book_id as bookId,
        tr.chapter_id as chapterId,
        tr.page_id as pageId,
        tr.page_number as pageNumber,
        tr.wpm,
        tr.accuracy,
        tr.duration,
        tr.errors_count as errorsCount,
        tr.completed_at as completedAt,
        b.title as bookTitle,
        c.title as chapterTitle
      FROM typing_results tr
      JOIN books b ON tr.book_id = b.id
      JOIN chapters c ON tr.chapter_id = c.id
      WHERE tr.user_id = ? 
      ORDER BY tr.completed_at DESC
    `);
    return stmt.all(userId) as (TypingResult & { bookTitle: string, chapterTitle: string })[];
  }

  static getStatsByUserId(userId: number): TypingStats {
    const stmt = db.prepare(`
      SELECT 
        COUNT(*) as total_sessions_completed,
        AVG(wpm) as average_wpm,
        AVG(accuracy) as average_accuracy,
        SUM(duration) as total_time_spent,
        MAX(wpm) as best_wpm,
        MAX(accuracy) as best_accuracy
      FROM typing_results 
      WHERE user_id = ?
    `);
    
    const result = stmt.get(userId) as any;
    
    return {
      totalSessionsCompleted: result.total_sessions_completed || 0,
      averageWpm: Math.round(result.average_wpm || 0),
      averageAccuracy: Math.round(result.average_accuracy || 0),
      totalWordsTyped: Math.round((result.average_wpm || 0) * (result.total_time_spent || 0) / 60000),
      totalTimeSpent: result.total_time_spent || 0,
      bestWpm: result.best_wpm || 0,
      bestAccuracy: result.best_accuracy || 0
    };
  }

  static getStatsByUserIdAndBookId(userId: number, bookId: number): TypingStats {
    const stmt = db.prepare(`
      SELECT 
        COUNT(*) as total_sessions_completed,
        AVG(wpm) as average_wpm,
        AVG(accuracy) as average_accuracy,
        SUM(duration) as total_time_spent,
        MAX(wpm) as best_wpm,
        MAX(accuracy) as best_accuracy
      FROM typing_results 
      WHERE user_id = ? AND book_id = ?
    `);
    
    const result = stmt.get(userId, bookId) as any;
    
    return {
      totalSessionsCompleted: result.total_sessions_completed || 0,
      averageWpm: Math.round(result.average_wpm || 0),
      averageAccuracy: Math.round(result.average_accuracy || 0),
      totalWordsTyped: Math.round((result.average_wpm || 0) * (result.total_time_spent || 0) / 60000),
      totalTimeSpent: result.total_time_spent || 0,
      bestWpm: result.best_wpm || 0,
      bestAccuracy: result.best_accuracy || 0
    };
  }
}

export class PageModel {
  static findByChapterId(chapterId: number): Page[] {
    const stmt = db.prepare(`
      SELECT 
        id,
        chapter_id as chapterId,
        page_number as pageNumber,
        content
      FROM pages 
      WHERE chapter_id = ?
      ORDER BY page_number
    `);
    
    return stmt.all(chapterId) as Page[];
  }

  static findById(id: number): Page | null {
    const stmt = db.prepare(`
      SELECT 
        id,
        chapter_id as chapterId,
        page_number as pageNumber,
        content
      FROM pages 
      WHERE id = ?
    `);
    
    return stmt.get(id) as Page | null;
  }

  static findByChapterIdAndPageNumber(chapterId: number, pageNumber: number): Page | null {
    const stmt = db.prepare(`
      SELECT 
        id,
        chapter_id as chapterId,
        page_number as pageNumber,
        content
      FROM pages 
      WHERE chapter_id = ? AND page_number = ?
    `);
    
    return stmt.get(chapterId, pageNumber) as Page | null;
  }
}
