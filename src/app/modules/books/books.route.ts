import express from 'express';
import { BookController } from './books.controller';

const router = express.Router();

router.get('/:id', BookController.getSingleBook);
router.get('/', BookController.getAllBooks);

export const BookRoutes = router;
