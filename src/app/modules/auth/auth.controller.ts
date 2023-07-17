import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IUser } from '../users/users.interface';
import { AuthService } from './auth.service';

const signUpUser = catchAsync(async (req: Request, res: Response) => {
  const userData = req.body;

  const result = await AuthService.signUpUser(userData);

  sendResponse<IUser>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User created successfully',
    data: result,
  });
});

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const loginInfo = req.body;
  const result = await AuthService.loginUser(loginInfo);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Login successfully !',
    data: result,
  });
});

export const AuthController = {
  signUpUser,
  loginUser,
};
