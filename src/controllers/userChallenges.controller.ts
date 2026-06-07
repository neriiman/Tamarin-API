import type { Request, Response } from 'express';
import { asyncMiddleWare } from '../middleware/async.middleware.js';
import type { GetUserChallengesQuery } from '../validators/userChallenges.validation.js';
import { getUserChallenges } from '../services/userChallenges.service.js';

export const getUserChallengesController = asyncMiddleWare(async (req: Request, res: Response) => {
  const query = req.validatedQuery as GetUserChallengesQuery;
  const { id: userId } = req.user!;
  const challenges = await getUserChallenges(userId, query);

  res.status(200).json({ data: challenges });
});
