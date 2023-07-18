import express from 'express';
import validateRequest from '../../middlewares/validedRequest';
import { BookController } from './books.controller';
import { bookZodValidation } from './books.validation';

const router = express.Router();
router.post(
  '/add-book',
  validateRequest(bookZodValidation.addBookZodSchema),
  BookController.addBook
);
router.patch(
  '/:id',
  validateRequest(bookZodValidation.updateBookZodSchema),
  BookController.updateBook
);
router.patch(
  '/add-review/:id',
  validateRequest(bookZodValidation.addBookReviewZodSchema),
  BookController.addReviewBook
);
router.get('/reviews/:id', BookController.getReviews);
router.get('/:id', BookController.getSingleBook);
router.delete('/:id', BookController.deleteBook);
router.get('/', BookController.getAllBooks);

export const BookRoutes = router;
