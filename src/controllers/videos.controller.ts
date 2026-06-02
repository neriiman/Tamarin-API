import type { Request, Response } from 'express';
import { asyncMiddleWare } from '../middleware/async.middleware.js';
import { getVideoById, getVideos } from '../services/videos.service.js';
import type { getVideoByIdParams, getVideosQuery } from '../validators/video.validation.js';

export const getVideosController = asyncMiddleWare(async (req: Request, res: Response) => {
  const query = req.validatedQuery as getVideosQuery;
  const results = await getVideos(query);
  res.status(200).json(results);
});
export const getVideoByIdController = asyncMiddleWare(async (req: Request, res: Response) => {
  const { id } = req.validatedParams as getVideoByIdParams;
  const video = await getVideoById(id);
  res.status(200).json({
    data: video,
  });
});
