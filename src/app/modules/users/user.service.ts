import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiErrors';
import { User } from './user.model';
import { IBookId } from './users.interface';

const addToWishlist = async (payload: IBookId) => {
  const { userId, bookId } = payload;
  const isExist = await User.findById(userId);
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not Found');
  }

  const result = await User.findByIdAndUpdate(
    userId,
    {
      $push: { wishlist: bookId },
    },
    { new: true }
  );
  return result;
};
const addToReadSoon = async (payload: IBookId) => {
  const { userId, bookId } = payload;
  const isExist = await User.findById(userId);
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not Found');
  }
  //   await User.findByIdAndUpdate(id, {
  //     $pull: { wishlist: bookId },
  //   });
  const result = await User.findByIdAndUpdate(
    userId,
    {
      $push: { readSoon: bookId },
    },
    { new: true }
  );
  return result;
};

const addToFinished = async (payload: IBookId) => {
  const { userId, bookId } = payload;
  const isExist = await User.findById(userId);
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not Found');
  }
  // remove from wishlist
  //   await User.findByIdAndUpdate(id, {
  //     $pull: { wishlist: bookId },
  //   });
  //   await User.findByIdAndUpdate(id, {
  //     $pull: { readSoon: bookId },
  //   });
  const result = await User.findByIdAndUpdate(
    userId,
    {
      $push: { finishedBook: bookId },
    },
    { new: true }
  );
  return result;
};

export const UserService = {
  addToWishlist,
  addToReadSoon,
  addToFinished,
};
