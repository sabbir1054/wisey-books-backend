"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validedRequest_1 = __importDefault(require("../../middlewares/validedRequest"));
const books_controller_1 = require("./books.controller");
const books_validation_1 = require("./books.validation");
const router = express_1.default.Router();
router.post('/add-book', (0, validedRequest_1.default)(books_validation_1.bookZodValidation.addBookZodSchema), books_controller_1.BookController.addBook);
router.patch('/:id', (0, validedRequest_1.default)(books_validation_1.bookZodValidation.updateBookZodSchema), books_controller_1.BookController.updateBook);
router.patch('/add-review/:id', (0, validedRequest_1.default)(books_validation_1.bookZodValidation.addBookReviewZodSchema), books_controller_1.BookController.addReviewBook);
router.get('/:id', books_controller_1.BookController.getSingleBook);
router.delete('/:id', books_controller_1.BookController.deleteBook);
router.get('/', books_controller_1.BookController.getAllBooks);
exports.BookRoutes = router;
