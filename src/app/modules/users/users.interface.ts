/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';

export type IUser = {
  fullName: string;
  email: string;
  password: string;
};
export type UserModel = {
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>;
} & Model<IUser>;
