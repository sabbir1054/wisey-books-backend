'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const express_1 = __importDefault(require('express'));
const auth_route_1 = require('../modules/auth/auth.route');
const books_route_1 = require('../modules/books/books.route');
const user_route_1 = require('../modules/users/user.route');
const router = express_1.default.Router();
const modulesRoute = [
  {
    path: '/books',
    route: books_route_1.BookRoutes,
  },
  {
    path: '/auth',
    route: auth_route_1.AuthRoutes,
  },
  {
    path: '/users/',
    route: user_route_1.UserRoutes,
  },
];
modulesRoute.map(route => router.use(route.path, route.route));
exports.default = router;
