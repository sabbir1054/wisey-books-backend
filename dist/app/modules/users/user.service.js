"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiErrors_1 = __importDefault(require("../../../errors/ApiErrors"));
const user_model_1 = require("./user.model");
const getWishlist = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield user_model_1.User.findById(id).populate('wishlist');
    if (!isExist) {
        throw new ApiErrors_1.default(http_status_1.default.NOT_FOUND, 'User not Found');
    }
    const result = isExist === null || isExist === void 0 ? void 0 : isExist.wishlist;
    return result;
});
const getReadSoon = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield user_model_1.User.findById(id).populate('readSoon');
    if (!isExist) {
        throw new ApiErrors_1.default(http_status_1.default.NOT_FOUND, 'User not Found');
    }
    const result = isExist === null || isExist === void 0 ? void 0 : isExist.readSoon;
    return result;
});
const getFinished = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield user_model_1.User.findById(id).populate('finishedBook');
    if (!isExist) {
        throw new ApiErrors_1.default(http_status_1.default.NOT_FOUND, 'User not Found');
    }
    const result = isExist === null || isExist === void 0 ? void 0 : isExist.finishedBook;
    return result;
});
const addToWishlist = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, bookId } = payload;
    const isExist = yield user_model_1.User.findById(userId);
    if (!isExist) {
        throw new ApiErrors_1.default(http_status_1.default.NOT_FOUND, 'User not Found');
    }
    const result = yield user_model_1.User.findByIdAndUpdate(userId, {
        $push: { wishlist: bookId },
    }, { new: true });
    return result;
});
const addToReadSoon = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, bookId } = payload;
    const isExist = yield user_model_1.User.findById(userId);
    if (!isExist) {
        throw new ApiErrors_1.default(http_status_1.default.NOT_FOUND, 'User not Found');
    }
    //   await User.findByIdAndUpdate(id, {
    //     $pull: { wishlist: bookId },
    //   });
    const result = yield user_model_1.User.findByIdAndUpdate(userId, {
        $push: { readSoon: bookId },
    }, { new: true });
    return result;
});
const addToFinished = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, bookId } = payload;
    const isExist = yield user_model_1.User.findById(userId);
    if (!isExist) {
        throw new ApiErrors_1.default(http_status_1.default.NOT_FOUND, 'User not Found');
    }
    // remove from wishlist
    //   await User.findByIdAndUpdate(id, {
    //     $pull: { wishlist: bookId },
    //   });
    //   await User.findByIdAndUpdate(id, {
    //     $pull: { readSoon: bookId },
    //   });
    const result = yield user_model_1.User.findByIdAndUpdate(userId, {
        $push: { finishedBook: bookId },
    }, { new: true });
    return result;
});
const getUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.findById(id);
    return result;
});
exports.UserService = {
    addToWishlist,
    addToReadSoon,
    addToFinished,
    getFinished,
    getReadSoon,
    getWishlist,
    getUser,
};
