import { Schema, model, Types } from 'mongoose';
import { BookModel, IBook } from './books.interface';

const bookSchema = new Schema<IBook, BookModel>(
  {
    title: String,
    author: String,
    genre: String,
    publicationDate: String,
    reviews: [Object],
    imgUrl: String,
    user: Types.ObjectId,
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);
export const Book = model<IBook, BookModel>('Book', bookSchema);
