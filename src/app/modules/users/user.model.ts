import bcrypt from 'bcrypt';
import { Schema, Types, model } from 'mongoose';
import { IUser, UserModel } from './users.interface';
export const UserSchema = new Schema<IUser, UserModel>(
  {
    fullName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    wishlist: {
      type: [Types.ObjectId],
      required: false,
    },
    finishedBook: {
      type: [Types.ObjectId],
      required: false,
    },
    readSoon: {
      type: [Types.ObjectId],
      required: false,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        delete ret.password; // Exclude password field from the response
      },
    },
  }
);

// password match
UserSchema.statics.isPasswordMatched = async function (
  givenPassword: string,
  savedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(givenPassword, savedPassword);
};
export const User = model<IUser, UserModel>('User', UserSchema);
