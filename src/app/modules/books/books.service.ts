import { IBook } from './books.interface';
import { Book } from './books.model';

const getAllBooksFromBD = async (): Promise<IBook[]> => {
  const result = await Book.find({});
  return result;
};

export const BookService = {
  getAllBooksFromBD,
};
