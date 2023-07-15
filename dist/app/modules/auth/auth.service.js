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
exports.AuthService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("../../../config"));
const ApiErrors_1 = __importDefault(require("../../../errors/ApiErrors"));
const user_model_1 = require("../users/user.model");
const signUpUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // hashing password
    payload.password = yield bcrypt_1.default.hash(payload.password, Number(config_1.default.bcrypt_salt_rounds));
    const result = yield user_model_1.User.create(payload);
    return result;
});
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // check user
    const isExist = yield user_model_1.User.findOne({ email: payload.email }, { email: 1, fullName: 1, password: 1 });
    if (!isExist) {
        throw new ApiErrors_1.default(http_status_1.default.NOT_FOUND, 'User does not exist');
    }
    // password checking
    if (isExist.password &&
        !(yield user_model_1.User.isPasswordMatched(payload.password, isExist.password))) {
        throw new ApiErrors_1.default(http_status_1.default.UNAUTHORIZED, 'Password is not matched');
    }
    const userData = { email: isExist.email, fullName: isExist.fullName };
    return userData;
});
exports.AuthService = {
    signUpUser,
    loginUser,
};
