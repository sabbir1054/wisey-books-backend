import express from 'express';
import { AuthRoutes } from '../modules/auth/auth.route';
import { BookRoutes } from '../modules/books/books.route';

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
];

modulesRoute.map(route => router.use(route.path, route.route));

export default router;
