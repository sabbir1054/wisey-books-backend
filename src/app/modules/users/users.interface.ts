/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose';
import { IBook } from '../books/books.interface';

export type IBookId = {
  bookId: Types.ObjectId;
  userId: Types.ObjectId;
};

export type IUser = {
  fullName: string;
  email: string;
  password: string;
  wishlist?: Types.ObjectId[] | IBook[];
  readSoon?: Types.ObjectId[] | IBook[];
  finishedBook?: Types.ObjectId[] | IBook[];
};
export type UserModel = {
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>;
} & Model<IUser>;
