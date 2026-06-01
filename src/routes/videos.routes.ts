import e from 'express';
import { getVideoByIdController } from '../controllers/videos.controller.js';
import { validateParams } from '../middleware/validate.middleware.js';
import { getVideoByIdSchema } from '../validators/video.validation.js';

const videosRouter = e.Router();

// videosRouter.get('/',);
videosRouter.get('/:id', validateParams(getVideoByIdSchema), getVideoByIdController);

export default videosRouter;
