import httpStatus from 'http-status';
import { SortOrder } from 'mongoose';
import ApiError from '../../../errors/ApiErrors';
import { paginationHelpers } from '../../../helpers/paginationHelpers';
import { IGenericResponse } from '../../../interfaces/common';
import IPaginationOptions from '../../../interfaces/paginations';
import { bookSearchableFields } from './books.constant';
import { IBook, IBookFilters } from './books.interface';
import { Book } from './books.model';

const addBookToDB = async (payload: IBook): Promise<IBook | null> => {
  const result = await Book.create(payload);
  return result;
};

const getAllBooksFromBD = async (
  filters: IBookFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IBook[]>> => {
  // Extract searchTerm to implement search query
  const { searchTerm, publicationYear, ...filtersData } = filters;

  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];

  // Search needs $or for searching in specified fields
  if (searchTerm) {
    andConditions.push({
      $or: bookSearchableFields.map(field => ({
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
  const sortConditions: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  // If there is no condition , put {} to give all data
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};
  const result = await Book.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);
  const total = await Book.countDocuments(whereConditions);
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleBookFromDB = async (id: string): Promise<IBook | null> => {
  const result = await Book.findById(id);
  return result;
};
const updateBookToDB = async (
  id: string,
  payload: Partial<IBook>
): Promise<IBook | null> => {
  const isExist = await Book.findById(id);
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Book not Found');
  }
  const result = await Book.findByIdAndUpdate(id, payload, { new: true });
  return result;
};

const deleteBookFromDB = async (id: string): Promise<IBook | null> => {
  const isExist = await Book.findById(id);
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Book not Found');
  }
  const result = await Book.findByIdAndDelete(id);
  return result;
};

export const BookService = {
  getAllBooksFromBD,
  getSingleBookFromDB,
  addBookToDB,
  updateBookToDB,
  deleteBookFromDB,
};
