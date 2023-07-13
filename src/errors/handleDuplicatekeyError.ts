import { IGenericErrorMessage } from '../interfaces/error';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handleDuplicateKeyError = (error: any) => {
  const errors: IGenericErrorMessage[] = [];
  if (error.code === 11000) {
    const field = error.message.match(/index: (.+?)_/)[1];
    errors.push({
      path: field,
      message: 'Duplicate key Error',
    });
  }

  const statusCode = 400;
  return {
    statusCode,
    message: 'Duplicate key Error',
    errorMessages: errors,
  };
};

export default handleDuplicateKeyError;
