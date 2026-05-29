import type { Request, Response } from 'express';
import { asyncMiddleWare } from '../middleware/async.middleware.js';
import { getChallenges } from '../services/challenges.service.js';
import type { GetChallengesQuery } from '../validators/challenges.validation.js';

export const getChallengesController = asyncMiddleWare(async (req: Request, res: Response) => {
  const query = req.query as unknown as GetChallengesQuery;

  const result = await getChallenges(query);
  res.status(200).json({ result });
});
