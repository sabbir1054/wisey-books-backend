import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/paginationFields';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { bookFilterableFields } from './books.constant';
import { IBook } from './books.interface';
import { BookService } from './books.service';

const addBook = catchAsync(async (req: Request, res: Response) => {
  const bookData = req.body;
  const result = await BookService.addBookToDB(bookData);
  sendResponse<IBook>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Book added successfully',
    data: result,
  });
});

const getAllBooks = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, bookFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await BookService.getAllBooksFromBD(
    filters,
    paginationOptions
  );
  sendResponse<IBook[]>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Book retrieve successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleBook = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await BookService.getSingleBookFromDB(id);

  sendResponse<IBook>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Book retrieve successfully !',
    data: result,
  });
});

const updateBook = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const bookUpdatedInfo = req.body;

  const result = await BookService.updateBookToDB(id, bookUpdatedInfo);

  sendResponse<IBook>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Book updated successfully !',
    data: result,
  });
});
const deleteBook = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await BookService.deleteBookFromDB(id);
  sendResponse<IBook>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Book deleted successfully !',
    data: result,
  });
});

export const BookController = {
  getAllBooks,
  getSingleBook,
  addBook,
  updateBook,
  deleteBook,
};
