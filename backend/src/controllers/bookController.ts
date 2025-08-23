import Joi from "joi";
import type { Request, Response } from "express";
import { BookModel, ChapterModel, PageModel } from "../models/index.js";

const paginationSchema = Joi.object({
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(50).default(10),
  search: Joi.string().optional(),
});

export const getBooks = async (req: Request, res: Response) => {
  try {
    const { error, value } = paginationSchema.validate(req.query);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { page, limit, search } = value;

    let result;
    if (search) {
      result = BookModel.search(search, page, limit);
    } else {
      result = BookModel.findAll(page, limit);
    }

    res.json({
      books: result.books,
      pagination: {
        currentPage: page,
        totalPages: result.totalPages,
        totalItems: result.total,
        itemsPerPage: limit,
        hasNextPage: page < result.totalPages,
        hasPrevPage: page > 1,
      },
    });
  } catch (error) {
    console.error("Get books error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getBookById = async (req: Request, res: Response) => {
  try {
    const bookId = parseInt(req.params.id);

    if (isNaN(bookId)) {
      return res.status(400).json({ error: "Invalid book ID" });
    }

    const includeChapters = req.query.chapters === "true";

    let book;
    if (includeChapters) {
      book = BookModel.findByIdWithChapters(bookId);
    } else {
      book = BookModel.findById(bookId);
    }

    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }

    res.json(book);
  } catch (error) {
    console.error("Get book by ID error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getBookChapters = async (req: Request, res: Response) => {
  try {
    const bookId = parseInt(req.params.id);

    if (isNaN(bookId)) {
      return res.status(400).json({ error: "Invalid book ID" });
    }

    // Verify book exists
    const book = BookModel.findById(bookId);
    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }

    const chapters = ChapterModel.findByBookId(bookId);

    res.json({ chapters });
  } catch (error) {
    console.error("Get book chapters error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getChapterById = async (req: Request, res: Response) => {
  try {
    const chapterId = parseInt(req.params.chapterId);

    if (isNaN(chapterId)) {
      return res.status(400).json({ error: "Invalid chapter ID" });
    }

    const chapter = ChapterModel.findById(chapterId);

    if (!chapter) {
      return res.status(404).json({ error: "Chapter not found" });
    }

    res.json(chapter);
  } catch (error) {
    console.error("Get chapter by ID error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getChapterByNumber = async (req: Request, res: Response) => {
  try {
    const bookId = parseInt(req.params.id);
    const chapterNumber = parseInt(req.params.chapterNumber);

    if (isNaN(bookId) || isNaN(chapterNumber)) {
      return res
        .status(400)
        .json({ error: "Invalid book ID or chapter number" });
    }

    const chapter = ChapterModel.findByBookIdAndChapterNumber(
      bookId,
      chapterNumber,
    );

    if (!chapter) {
      return res.status(404).json({ error: "Chapter not found" });
    }

    res.json(chapter);
  } catch (error) {
    console.error("Get chapter by number error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getChapterPages = async (req: Request, res: Response) => {
  try {
    const chapterId = parseInt(req.params.chapterId);

    if (isNaN(chapterId)) {
      return res.status(400).json({ error: "Invalid chapter ID" });
    }

    // Verify chapter exists
    const chapter = ChapterModel.findById(chapterId);
    if (!chapter) {
      return res.status(404).json({ error: "Chapter not found" });
    }

    const pages = PageModel.findByChapterId(chapterId);

    res.json({ pages });
  } catch (error) {
    console.error("Get chapter pages error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getChapterWithPages = async (req: Request, res: Response) => {
  try {
    const chapterId = parseInt(req.params.chapterId);

    if (isNaN(chapterId)) {
      return res.status(400).json({ error: "Invalid chapter ID" });
    }

    const chapter = ChapterModel.findByIdWithPages(chapterId);

    if (!chapter) {
      return res.status(404).json({ error: "Chapter not found" });
    }

    res.json(chapter);
  } catch (error) {
    console.error("Get chapter with pages error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getPageById = async (req: Request, res: Response) => {
  try {
    const pageId = parseInt(req.params.pageId);

    if (isNaN(pageId)) {
      return res.status(400).json({ error: "Invalid page ID" });
    }

    const page = PageModel.findById(pageId);

    if (!page) {
      return res.status(404).json({ error: "Page not found" });
    }

    res.json(page);
  } catch (error) {
    console.error("Get page by ID error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getPageByNumber = async (req: Request, res: Response) => {
  try {
    const chapterId = parseInt(req.params.chapterId);
    const pageNumber = parseInt(req.params.pageNumber);

    if (isNaN(chapterId) || isNaN(pageNumber)) {
      return res
        .status(400)
        .json({ error: "Invalid chapter ID or page number" });
    }

    const page = PageModel.findByChapterIdAndPageNumber(chapterId, pageNumber);

    if (!page) {
      return res.status(404).json({ error: "Page not found" });
    }

    res.json(page);
  } catch (error) {
    console.error("Get page by number error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
