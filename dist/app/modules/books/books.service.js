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
var __rest =
  (this && this.__rest) ||
  function (s, e) {
    var t = {};
    for (var p in s)
      if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === 'function')
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (
          e.indexOf(p[i]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(s, p[i])
        )
          t[p[i]] = s[p[i]];
      }
    return t;
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.BookService = void 0;
const http_status_1 = __importDefault(require('http-status'));
const ApiErrors_1 = __importDefault(require('../../../errors/ApiErrors'));
const paginationHelpers_1 = require('../../../helpers/paginationHelpers');
const books_constant_1 = require('./books.constant');
const books_model_1 = require('./books.model');
const addBookToDB = payload =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield books_model_1.Book.create(payload);
    return result;
  });
const getAllBooksFromBD = (filters, paginationOptions) =>
  __awaiter(void 0, void 0, void 0, function* () {
    // Extract searchTerm to implement search query
    const { searchTerm, publicationYear } = filters,
      filtersData = __rest(filters, ['searchTerm', 'publicationYear']);
    const { page, limit, skip, sortBy, sortOrder } =
      paginationHelpers_1.paginationHelpers.calculatePagination(
        paginationOptions
      );
    const andConditions = [];
    // Search needs $or for searching in specified fields
    if (searchTerm) {
      andConditions.push({
        $or: books_constant_1.bookSearchableFields.map(field => ({
          [field]: {
            $regex: searchTerm,
            $options: 'i',
          },
        })),
      });
    }
    if (publicationYear) {
      andConditions.push({
        publicationDate: { $regex: `.*${publicationYear}.*` },
      });
    }
    // Filters needs $and to fullfill all the conditions
    if (Object.keys(filtersData).length) {
      andConditions.push({
        $and: Object.entries(filtersData).map(([field, value]) => ({
          [field]: { $regex: new RegExp(value, 'i') },
        })),
      });
    }
    // Dynamic sort needs  fields to  do sorting
    const sortConditions = {};
    if (sortBy && sortOrder) {
      sortConditions[sortBy] = sortOrder;
    }
    // If there is no condition , put {} to give all data
    const whereConditions =
      andConditions.length > 0 ? { $and: andConditions } : {};
    const result = yield books_model_1.Book.find(whereConditions)
      .sort(sortConditions)
      .skip(skip)
      .limit(limit);
    const total = yield books_model_1.Book.countDocuments(whereConditions);
    return {
      meta: {
        page,
        limit,
        total,
      },
      data: result,
    };
  });
const getSingleBookFromDB = id =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield books_model_1.Book.findById(id);
    return result;
  });
const updateBookToDB = (id, payload) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield books_model_1.Book.findById(id);
    if (!isExist) {
      throw new ApiErrors_1.default(
        http_status_1.default.NOT_FOUND,
        'Book not Found'
      );
    }
    const result = yield books_model_1.Book.findByIdAndUpdate(id, payload, {
      new: true,
    });
    return result;
  });
const deleteBookFromDB = id =>
  __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield books_model_1.Book.findById(id);
    if (!isExist) {
      throw new ApiErrors_1.default(
        http_status_1.default.NOT_FOUND,
        'Book not Found'
      );
    }
    const result = yield books_model_1.Book.findByIdAndDelete(id);
    return result;
  });
const addReviewBook = (id, payload) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield books_model_1.Book.findById(id);
    if (!isExist) {
      throw new ApiErrors_1.default(
        http_status_1.default.NOT_FOUND,
        'Book not Found'
      );
    }
    const result = yield books_model_1.Book.findByIdAndUpdate(
      id,
      {
        $push: { reviews: payload },
      },
      { new: true }
    );
    return result;
  });
exports.BookService = {
  getAllBooksFromBD,
  getSingleBookFromDB,
  addBookToDB,
  updateBookToDB,
  deleteBookFromDB,
  addReviewBook,
};
