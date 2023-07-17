import { Model, Types } from 'mongoose';

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
  user: Types.ObjectId;
};

export type BookModel = Model<IBook, Record<string, unknown>>;

export type IBookFilters = {
  searchTerm?: string;
  genre?: string;
  publicationYear?: string;
};
