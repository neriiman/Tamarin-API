import e from 'express';
import { getVideoByIdController, getVideosController } from '../controllers/videos.controller.js';
import { validateParams, validateQuery } from '../middleware/validate.middleware.js';
import { getVideoByIdSchema, getVideosQuerySchema } from '../validators/video.validation.js';
import { optionalAuthMiddleware } from '../middleware/auth.middleware.js';

const videosRouter = e.Router();

videosRouter.get(
  '/',
  optionalAuthMiddleware,
  validateQuery(getVideosQuerySchema),
  getVideosController,
);
videosRouter.get(
  '/:id',
  optionalAuthMiddleware,
  validateParams(getVideoByIdSchema),
  getVideoByIdController,
);

export default videosRouter;
