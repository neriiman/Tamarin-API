import type { Request, Response } from 'express';
import { asyncMiddleWare } from '../middleware/async.middleware.js';
import { getVideoById } from '../services/videos.service.js';
import type { getVideoByIdParams } from '../validators/video.validation.js';

export const getVideoByIdController = asyncMiddleWare(async (req: Request, res: Response) => {
  const { id } = req.validatedParams as getVideoByIdParams;
  const video = await getVideoById(id);
  res.status(200).json({
    data: video,
  });
});
