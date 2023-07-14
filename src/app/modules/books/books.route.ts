import express from 'express';
import validateRequest from '../../middlewares/validedRequest';
import { BookController } from './books.controller';
import { bookZodValidation } from './books.validation';

const router = express.Router();

router.get('/:id', BookController.getSingleBook);
router.post(
  '/add-book',
  validateRequest(bookZodValidation.addBookZodSchema),
  BookController.addBook
);
router.get('/', BookController.getAllBooks);

export const BookRoutes = router;
