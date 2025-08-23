import { Router } from 'express';
import { 
  getBooks, 
  getBookById, 
  getBookChapters, 
  getChapterById,
  getChapterPages,
  getChapterWithPages,
  getPageById,
  getPageByNumber
} from '../controllers/bookController.js';
import { optionalAuth } from '../middleware/auth.js';

const router = Router();

router.use(optionalAuth);

router.get('/', getBooks);
router.get('/:id', getBookById);
router.get('/:id/chapters', getBookChapters);
router.get('/:bookId/chapters/:chapterId', getChapterById);
router.get('/:bookId/chapters/:chapterId/pages', getChapterPages);
router.get('/:bookId/chapters/:chapterId/with-pages', getChapterWithPages);
router.get('/:bookId/chapters/:chapterId/pages/:pageNumber', getPageByNumber);
router.get('/pages/:pageId', getPageById);

export default router;
