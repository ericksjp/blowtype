import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Only redirect to login for auth-required endpoints
    if (error.response?.status === 401) {
      const isAuthRequiredPath = error.config?.url?.includes('/typing/') || 
                                 error.config?.url?.includes('/users/') ||
                                 error.config?.url?.includes('/auth/');
      
      if (isAuthRequiredPath && !window.location.href.includes("/auth/login")) {
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        window.location.href = '/auth/login';
      }
    }
    return Promise.reject(error);
  }
);

// Auth types
export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  username: string;
  password: string;
}

export interface User {
  id: number;
  email: string;
  username: string;
}

export interface AuthResponse {
  message: string;
  token: string;
  user: User;
}

export interface TypingResultData {
  bookId: number;
  chapterId: number;
  pageId: number;
  pageNumber: number;
  wpm: number;
  accuracy: number;
  duration: number;
  errorsCount: number;
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

export interface BooksResponse {
  books: Book[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ChaptersResponse {
  chapters: Chapter[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface PagesResponse {
  pages: Page[];
}

export const authAPI = {
  login: async (data: LoginData): Promise<AuthResponse> => {
    const response = await api.post('/auth/login', data);
    return response.data;
  },

  register: async (data: RegisterData): Promise<AuthResponse> => {
    const response = await api.post('/auth/register', data);
    return response.data;
  },
};

export const typingAPI = {
  submitResult: async (data: TypingResultData) => {
    const response = await api.post('/typing/submit', data);
    return response.data;
  },

  getHistory: async () => {
    const response = await api.get('/typing/history');
    return response.data;
  },

  getStats: async (): Promise<TypingStats> => {
    const response = await api.get('/typing/stats');
    return response.data;
  },
};

export const bookAPI = {
  getBooks: async (page: number = 1, limit: number = 10, search?: string): Promise<BooksResponse> => {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });
    
    if (search) {
      params.append('search', search);
    }
    
    const response = await api.get(`/books?${params.toString()}`);
    return response.data;
  },

  getBookById: async (bookId: number): Promise<Book> => {
    const response = await api.get(`/books/${bookId}`);
    return response.data;
  },

  getBookChapters: async (bookId: number, page: number = 1, limit: number = 20): Promise<ChaptersResponse> => {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });
    
    const response = await api.get(`/books/${bookId}/chapters?${params.toString()}`);
    return response.data;
  },

  getChapterById: async (bookId: number, chapterId: number): Promise<Chapter> => {
    const response = await api.get(`/books/${bookId}/chapters/${chapterId}`);
    return response.data;
  },

  getChapterPages: async (bookId: number, chapterId: number): Promise<PagesResponse> => {
    const response = await api.get(`/books/${bookId}/chapters/${chapterId}/pages`);
    return response.data;
  },

  getChapterWithPages: async (bookId: number, chapterId: number): Promise<Chapter> => {
    const response = await api.get(`/books/${bookId}/chapters/${chapterId}/with-pages`);
    return response.data;
  },

  getPageByNumber: async (bookId: number, chapterId: number, pageNumber: number): Promise<Page> => {
    const response = await api.get(`/books/${bookId}/chapters/${chapterId}/pages/${pageNumber}`);
    return response.data;
  },

  getPageById: async (pageId: number): Promise<Page> => {
    const response = await api.get(`/books/pages/${pageId}`);
    return response.data;
  },
};

export const userAPI = {
  getProfile: async () => {
    const response = await api.get('/users/profile');
    return response.data;
  },
};

export default api;
