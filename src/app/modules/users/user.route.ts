import express from 'express';
import { UserController } from './user.controller';

const router = express.Router();

router.get('/:id', UserController.getUser);
router.get('/wishlist/:id', UserController.getWishlist);
router.get('/readSoon/:id', UserController.getReadSoon);
router.get('/finished/:id', UserController.getFinished);
router.patch('/add-wishlist', UserController.addToWishlist);
router.patch('/add-readSoon', UserController.addToReadSoon);
router.patch('/add-finished', UserController.addToFinished);

export const UserRoutes = router;
