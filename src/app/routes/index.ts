import express from 'express';
import { AuthRoutes } from '../modules/auth/auth.route';
import { BookRoutes } from '../modules/books/books.route';
import { UserRoutes } from '../modules/users/user.route';

const router = express.Router();

const modulesRoute = [
  {
    path: '/books',
    route: BookRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/users/',
    route: UserRoutes,
  },
];

modulesRoute.map(route => router.use(route.path, route.route));

export default router;
