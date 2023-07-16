import { Model } from 'mongoose';

export type IComment = {
  fullName: string;
  feedback: string;
};

export type IBook = {
  title: string;
  author: string;
  genre: string;
  publicationDate: string;
  reviews?: IComment[];
  imgUrl?: string;
  userEmail: string;
};

export type BookModel = Model<IBook, Record<string, unknown>>;

export type IBookFilters = {
  searchTerm?: string;
  genre?: string;
  publicationYear?: string;
};
