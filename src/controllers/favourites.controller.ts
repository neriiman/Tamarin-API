import type { Request, Response } from 'express';
import { asyncMiddleWare } from '../middleware/async.middleware.js';
import { getFavourites, toggleFavourite } from '../services/favourites.service.js';

export const toggleFavouriteController = asyncMiddleWare(async (req: Request, res: Response) => {
  const { id: userId } = req.user!;
  const { videoId } = req.validatedParams as { videoId: string };
  const result = await toggleFavourite(userId, videoId);
  res.status(200).json(result);
});

export const getFavouritesController = asyncMiddleWare(async (req: Request, res: Response) => {
  const { id: userId } = req.user!;
  const data = await getFavourites(userId);

  res.status(200).json({ data });
});
