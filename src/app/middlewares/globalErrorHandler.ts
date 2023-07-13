/* eslint-disable no-unused-vars */
import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
import config from '../../config';
import ApiError from '../../errors/ApiErrors';
import handleCastError from '../../errors/handleCastError';
import handleDuplicateKeyError from '../../errors/handleDuplicatekeyError';
import handleValidationError from '../../errors/handleValidationError';
import handleZodError from '../../errors/handleZodError';
import { errorLogger } from '../../shared/logger';
import { IGenericErrorMessage } from './../../interfaces/error';

// global error handler
const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  // eslint-disable-next-line no-unused-expressions
  config.env === 'development'
    ? // eslint-disable-next-line no-console
      console.log(`🐱‍🏍 globalErrorHandler ~~`, error)
    : errorLogger.error(`🐱‍🏍 globalErrorHandler ~~`, error);

  let statusCode = 500;
  let message = 'Something went wrong ! ';
  let errorMessages: IGenericErrorMessage[] = [];
  // validation error handle
  if (error?.name === 'ValidationError') {
    const simplifiedError = handleValidationError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  }
  // api error handle
  else if (error instanceof ApiError) {
    statusCode = error?.statusCode;
    message = error?.message;
    errorMessages = error?.message
      ? [{ path: '', message: error?.message }]
      : [];
  }
  // zod error handle
  else if (error instanceof ZodError) {
    const simplifiedError = handleZodError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  }
  // cast error handle
  else if (error?.name === 'CastError') {
    const simplifiedError = handleCastError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  }
  // handle duplicate key error
  else if (error?.name === 'MongoServerError' && error?.code === 11000) {
    const simplifiedError = handleDuplicateKeyError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: config.env !== 'production' ? error?.stack : undefined,
  });

  next();
};

export default globalErrorHandler;
