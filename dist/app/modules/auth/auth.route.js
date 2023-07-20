'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.AuthRoutes = void 0;
const express_1 = __importDefault(require('express'));
const validedRequest_1 = __importDefault(
  require('../../middlewares/validedRequest')
);
const user_validation_1 = require('../users/user.validation');
const auth_controller_1 = require('./auth.controller');
const auth_validation_1 = require('./auth.validation');
const router = express_1.default.Router();
router.post(
  '/signup',
  (0, validedRequest_1.default)(
    user_validation_1.UserValidation.signUpUserZodValidation
  ),
  auth_controller_1.AuthController.signUpUser
);
router.post(
  '/login',
  (0, validedRequest_1.default)(
    auth_validation_1.AuthValidation.loginUserZodValidation
  ),
  auth_controller_1.AuthController.loginUser
);
exports.AuthRoutes = router;
