import express from 'express';
import { BookRoutes } from '../modules/books/books.route';

const router = express.Router();

const modulesRoute = [
  {
    path: '/books',
    route: BookRoutes,
  },
];

modulesRoute.map(route => router.use(route.path, route.route));

export default router;
