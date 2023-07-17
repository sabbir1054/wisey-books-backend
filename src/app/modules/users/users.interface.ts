/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose';

export type IUser = {
  fullName: string;
  email: string;
  password: string;
  wishlist?: Types.ObjectId[];
  readSoon?: Types.ObjectId[];
  finishedBook?: Types.ObjectId[];
};
export type UserModel = {
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>;
} & Model<IUser>;
