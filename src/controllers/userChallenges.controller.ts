import type { Request, Response } from 'express';
import { asyncMiddleWare } from '../middleware/async.middleware.js';
import type {
  GetUserChallengesQuery,
  userChallengeIdParams,
} from '../validators/userChallenges.validation.js';
import {
  abandonChallenge,
  completeChallenge,
  getUserChallenges,
} from '../services/userChallenges.service.js';

export const getUserChallengesController = asyncMiddleWare(async (req: Request, res: Response) => {
  const query = req.validatedQuery as GetUserChallengesQuery;
  const { id: userId } = req.user!;
  const challenges = await getUserChallenges(userId, query);

  res.status(200).json({ data: challenges });
});

export const abandonChallengeController = asyncMiddleWare(async (req: Request, res: Response) => {
  const { id: userId } = req.user!;
  const { id: userChallengeId } = req.validatedParams as userChallengeIdParams;
  const updatedUserChallengeId = await abandonChallenge(userChallengeId, userId);

  res.status(200).json({ data: updatedUserChallengeId });
});
export const completeChallengeController = asyncMiddleWare(async (req: Request, res: Response) => {
  const { id: userId } = req.user!;
  const { id: userChallengeId } = req.validatedParams as userChallengeIdParams;
  const updatedUserChallengeId = await completeChallenge(userChallengeId, userId);

  res.status(200).json({ data: updatedUserChallengeId });
});
