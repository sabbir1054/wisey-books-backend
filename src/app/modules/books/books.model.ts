import { Schema, model } from 'mongoose';
import { BookModel, IBook } from './books.interface';

const bookSchema = new Schema<IBook, BookModel>(
  {
    title: String,
    author: String,
    genre: String,
    publicationDate: String,
    reviews: [Object],
    smImgUrl: String,
    xlImgUrl: String,
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);
export const Book = model<IBook, BookModel>('Book', bookSchema);
