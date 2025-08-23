import type { Request } from 'express';

export interface User {
  id: number;
  email: string;
  password: string;
  username: string;
  createdAt: string;
  updatedAt: string;
}

export interface Book {
  id: number;
  title: string;
  author: string;
  yearPublished: number;
  description: string;
  totalChapters: number;
  totalPages: number;
  createdAt: string;
  chapters?: Chapter[];
}

export interface Chapter {
  id: number;
  bookId: number;
  chapterNumber: number;
  title: string;
  totalPages: number;
  pages?: Page[];
}

export interface Page {
  id: number;
  chapterId: number;
  pageNumber: number;
  content: string;
}

export interface TypingResult {
  id: number;
  userId: number;
  bookId: number;
  chapterId: number;
  pageId: number;
  pageNumber: number;
  wpm: number;
  accuracy: number;
  duration: number;
  errorsCount: number;
  completedAt: string;
}

export interface TypingStats {
  totalSessionsCompleted: number;
  averageWpm: number;
  averageAccuracy: number;
  totalWordsTyped: number;
  totalTimeSpent: number;
  bestWpm: number;
  bestAccuracy: number;
}

export interface AuthRequest extends Request {
  user?: User;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  username: string;
}

export interface SubmitResultRequest {
  bookId: number;
  chapterId: number;
  pageId: number;
  pageNumber: number;
  wpm: number;
  accuracy: number;
  duration: number;
  errorsCount: number;
}
