'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const zod_1 = require('zod');
const config_1 = __importDefault(require('../../config'));
const ApiErrors_1 = __importDefault(require('../../errors/ApiErrors'));
const handleCastError_1 = __importDefault(
  require('../../errors/handleCastError')
);
const handleDuplicatekeyError_1 = __importDefault(
  require('../../errors/handleDuplicatekeyError')
);
const handleValidationError_1 = __importDefault(
  require('../../errors/handleValidationError')
);
const handleZodError_1 = __importDefault(
  require('../../errors/handleZodError')
);
const logger_1 = require('../../shared/logger');
// global error handler
const globalErrorHandler = (error, req, res, next) => {
  // eslint-disable-next-line no-unused-expressions
  config_1.default.env === 'development'
    ? // eslint-disable-next-line no-console
      console.log(`🐱‍🏍 globalErrorHandler ~~`, error)
    : logger_1.errorLogger.error(`🐱‍🏍 globalErrorHandler ~~`, error);
  let statusCode = 500;
  let message = 'Something went wrong ! ';
  let errorMessages = [];
  // validation error handle
  if (
    (error === null || error === void 0 ? void 0 : error.name) ===
    'ValidationError'
  ) {
    const simplifiedError = (0, handleValidationError_1.default)(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  }
  // api error handle
  else if (error instanceof ApiErrors_1.default) {
    statusCode = error === null || error === void 0 ? void 0 : error.statusCode;
    message = error === null || error === void 0 ? void 0 : error.message;
    errorMessages = (
      error === null || error === void 0 ? void 0 : error.message
    )
      ? [
          {
            path: '',
            message:
              error === null || error === void 0 ? void 0 : error.message,
          },
        ]
      : [];
  }
  // zod error handle
  else if (error instanceof zod_1.ZodError) {
    const simplifiedError = (0, handleZodError_1.default)(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  }
  // cast error handle
  else if (
    (error === null || error === void 0 ? void 0 : error.name) === 'CastError'
  ) {
    const simplifiedError = (0, handleCastError_1.default)(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  }
  // handle duplicate key error
  else if (
    (error === null || error === void 0 ? void 0 : error.name) ===
      'MongoServerError' &&
    (error === null || error === void 0 ? void 0 : error.code) === 11000
  ) {
    const simplifiedError = (0, handleDuplicatekeyError_1.default)(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  }
  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack:
      config_1.default.env !== 'production'
        ? error === null || error === void 0
          ? void 0
          : error.stack
        : undefined,
  });
  next();
};
exports.default = globalErrorHandler;
