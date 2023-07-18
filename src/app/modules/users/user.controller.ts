import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { UserService } from './user.service';

const addToWishlist = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;

  const result = await UserService.addToWishlist(payload);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Add to Wishlist !',
    data: result,
  });
});
const addToReadSoon = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;

  const result = await UserService.addToReadSoon(payload);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Add to Read soon !',
    data: result,
  });
});
const addToFinished = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;

  const result = await UserService.addToFinished(payload);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Add to finished list !',
    data: result,
  });
});

export const UserController = {
  addToWishlist,
  addToReadSoon,
  addToFinished,
};
