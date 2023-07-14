import express from 'express';
import validateRequest from '../../middlewares/validedRequest';
import { UserValidation } from '../users/user.validation';
import { AuthController } from './auth.controller';
import { AuthValidation } from './auth.validation';

const router = express.Router();

router.post(
  '/signup',
  validateRequest(UserValidation.signUpUserZodValidation),
  AuthController.signUpUser
);
router.post(
  '/login',
  validateRequest(AuthValidation.loginUserZodValidation),
  AuthController.loginUser
);

export const AuthRoutes = router;
