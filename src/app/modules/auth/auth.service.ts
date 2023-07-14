import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import config from '../../../config';
import ApiError from '../../../errors/ApiErrors';
import { User } from '../users/user.model';
import { IUser } from '../users/users.interface';
import { ILogin, ILoginResponse } from './auth.interface';

const signUpUser = async (payload: IUser): Promise<IUser> => {
  // hashing password
  payload.password = await bcrypt.hash(
    payload.password,
    Number(config.bcrypt_salt_rounds)
  );
  const result = await User.create(payload);
  return result;
};

const loginUser = async (payload: ILogin): Promise<ILoginResponse> => {
  // check user
  const isExist = await User.findOne(
    { email: payload.email },
    { email: 1, fullName: 1, password: 1 }
  );
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }
  // password checking
  if (
    isExist.password &&
    !(await User.isPasswordMatched(payload.password, isExist.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is not matched');
  }
  const userData = { email: isExist.email, fullName: isExist.fullName };

  return userData;
};

export const AuthService = {
  signUpUser,
  loginUser,
};
