'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.UserRoutes = void 0;
const express_1 = __importDefault(require('express'));
const user_controller_1 = require('./user.controller');
const router = express_1.default.Router();
router.get('/:id', user_controller_1.UserController.getUser);
router.get('/wishlist/:id', user_controller_1.UserController.getWishlist);
router.get('/readSoon/:id', user_controller_1.UserController.getReadSoon);
router.get('/finished/:id', user_controller_1.UserController.getFinished);
router.patch('/add-wishlist', user_controller_1.UserController.addToWishlist);
router.patch('/add-readSoon', user_controller_1.UserController.addToReadSoon);
router.patch('/add-finished', user_controller_1.UserController.addToFinished);
exports.UserRoutes = router;
