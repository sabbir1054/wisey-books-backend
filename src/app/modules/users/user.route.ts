import express from 'express';
import { UserController } from './user.controller';

const router = express.Router();

router.patch('/add-wishlist', UserController.addToWishlist);
router.patch('/add-readSoon', UserController.addToReadSoon);
router.patch('/add-finished', UserController.addToFinished);

export const UserRoutes = router;
