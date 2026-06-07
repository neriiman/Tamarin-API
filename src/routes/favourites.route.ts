import e from 'express';
import {
  getFavouritesController,
  toggleFavouriteController,
} from '../controllers/favourites.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';
import { validateParams } from '../middleware/validate.middleware.js';
import { toggleFavouriteParamsSchema } from '../validators/favourites.validation.js';

const router = e.Router();

router.post(
  '/videos/:videoId',
  authMiddleware,
  validateParams(toggleFavouriteParamsSchema),
  toggleFavouriteController,
);
router.post('/me', authMiddleware, getFavouritesController);

export default router;
