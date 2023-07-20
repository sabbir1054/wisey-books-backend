import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { UserService } from './user.service';
import { IUser } from './users.interface';

const getWishlist = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await UserService.getWishlist(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Retrieve Wishlist !',
    data: result,
  });
});
const getReadSoon = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await UserService.getReadSoon(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Retrieve Read Soon !',
    data: result,
  });
});
const getFinished = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await UserService.getFinished(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Retrieve Finished list !',
    data: result,
  });
});
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
const getUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await UserService.getUser(id);

  sendResponse<IUser>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User retrieve successfully !',
    data: result,
  });
});
export const UserController = {
  addToWishlist,
  addToReadSoon,
  addToFinished,
  getFinished,
  getReadSoon,
  getWishlist,
  getUser,
};
