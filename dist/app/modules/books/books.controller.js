'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.BookController = void 0;
const http_status_1 = __importDefault(require('http-status'));
const paginationFields_1 = require('../../../constants/paginationFields');
const catchAsync_1 = __importDefault(require('../../../shared/catchAsync'));
const pick_1 = __importDefault(require('../../../shared/pick'));
const sendResponse_1 = __importDefault(require('../../../shared/sendResponse'));
const books_constant_1 = require('./books.constant');
const books_service_1 = require('./books.service');
const addBook = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const bookData = req.body;
    const result = yield books_service_1.BookService.addBookToDB(bookData);
    (0, sendResponse_1.default)(res, {
      success: true,
      statusCode: http_status_1.default.OK,
      message: 'Book added successfully',
      data: result,
    });
  })
);
const getAllBooks = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.default)(
      req.query,
      books_constant_1.bookFilterableFields
    );
    const paginationOptions = (0, pick_1.default)(
      req.query,
      paginationFields_1.paginationFields
    );
    const result = yield books_service_1.BookService.getAllBooksFromBD(
      filters,
      paginationOptions
    );
    (0, sendResponse_1.default)(res, {
      success: true,
      statusCode: http_status_1.default.OK,
      message: 'Book retrieve successfully',
      meta: result.meta,
      data: result.data,
    });
  })
);
const getSingleBook = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield books_service_1.BookService.getSingleBookFromDB(id);
    (0, sendResponse_1.default)(res, {
      success: true,
      statusCode: http_status_1.default.OK,
      message: 'Book retrieve successfully !',
      data: result,
    });
  })
);
const updateBook = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const bookUpdatedInfo = req.body;
    const result = yield books_service_1.BookService.updateBookToDB(
      id,
      bookUpdatedInfo
    );
    (0, sendResponse_1.default)(res, {
      success: true,
      statusCode: http_status_1.default.OK,
      message: 'Book updated successfully !',
      data: result,
    });
  })
);
const deleteBook = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield books_service_1.BookService.deleteBookFromDB(id);
    (0, sendResponse_1.default)(res, {
      success: true,
      statusCode: http_status_1.default.OK,
      message: 'Book deleted successfully !',
      data: result,
    });
  })
);
const addReviewBook = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const review = req.body;
    const result = yield books_service_1.BookService.addReviewBook(id, review);
    (0, sendResponse_1.default)(res, {
      success: true,
      statusCode: http_status_1.default.OK,
      message: 'Book review updated successfully !',
      data: result,
    });
  })
);
exports.BookController = {
  getAllBooks,
  getSingleBook,
  addBook,
  updateBook,
  deleteBook,
  addReviewBook,
};
