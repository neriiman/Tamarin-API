import type { Request, Response } from 'express';
import { asyncMiddleWare } from '../middleware/async.middleware.js';
import { getCategories } from '../services/categories.service.js';

export const getCategoriesController = asyncMiddleWare(async (req: Request, res: Response) => {
  const result = await getCategories();
  res.status(200).json(result);
});
