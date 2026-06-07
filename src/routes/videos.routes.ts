import e from 'express';
import { getVideoByIdController, getVideosController } from '../controllers/videos.controller.js';
import { validateParams, validateQuery } from '../middleware/validate.middleware.js';
import { getVideoByIdSchema, getVideosQuerySchema } from '../validators/video.validation.js';
import { optionalAuthMiddleware } from '../middleware/auth.middleware.js';

const router = e.Router();

router.get('/', optionalAuthMiddleware, validateQuery(getVideosQuerySchema), getVideosController);
router.get(
  '/:id',
  optionalAuthMiddleware,
  validateParams(getVideoByIdSchema),
  getVideoByIdController,
);

export default router;
