import type { Request, Response } from 'express';
import { asyncMiddleWare } from '../middleware/async.middleware.js';
import { getVideoById, getVideos } from '../services/videos.service.js';
import type { getVideoByIdParams, GetVideosQuery } from '../validators/video.validation.js';

export const getVideosController = asyncMiddleWare(async (req: Request, res: Response) => {
  const query = req.validatedQuery as GetVideosQuery;
  const userId = req.user?.id ?? null;
  const results = await getVideos({ ...query, userId });
  res.status(200).json(results);
});

export const getVideoByIdController = asyncMiddleWare(async (req: Request, res: Response) => {
  const { id: videoId } = req.validatedParams as getVideoByIdParams;
  const userId = req.user?.id ?? null;

  const video = await getVideoById(videoId, userId);
  res.status(200).json({
    data: video,
  });
});
