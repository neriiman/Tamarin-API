import type { Request, Response } from 'express';
import { asyncMiddleWare } from '../middleware/async.middleware.js';
import type {
  CompleteDayParams,
  CompleteVideoParams,
  GetUserChallengesQuery,
  userChallengeIdParams,
} from '../validators/userChallenges.validation.js';
import {
  abandonChallenge,
  completeChallenge,
  completeChallengeDay,
  completeChallengeVideo,
  getUserChallenges,
  undoChallengeDay,
  undoChallengeVideo,
} from '../services/userChallenges.service.js';

export const getUserChallengesController = asyncMiddleWare(async (req: Request, res: Response) => {
  const query = req.validatedQuery as GetUserChallengesQuery;
  const { id: userId } = req.user!;
  const userChallenge = await getUserChallenges(userId, query);

  res.status(200).json({ userChallenge });
});

export const abandonChallengeController = asyncMiddleWare(async (req: Request, res: Response) => {
  const { id: userId } = req.user!;
  const { userChallengeId } = req.validatedParams as userChallengeIdParams;
  const updatedUserChallengeId = await abandonChallenge(userChallengeId, userId);

  res.status(200).json({ updatedUserChallengeId });
});

export const completeChallengeController = asyncMiddleWare(async (req: Request, res: Response) => {
  const { id: userId } = req.user!;
  const { userChallengeId } = req.validatedParams as userChallengeIdParams;
  const updatedUserChallengeId = await completeChallenge(userChallengeId, userId);

  res.status(200).json({ updatedUserChallengeId });
});

export const completeChallengeDayVideoController = asyncMiddleWare(
  async (req: Request, res: Response) => {
    const { id: userId } = req.user!;
    const { userChallengeId, challengeDayVideoId } = req.validatedParams as CompleteVideoParams;
    await completeChallengeVideo(userChallengeId, challengeDayVideoId, userId);

    res.status(204).send();
  },
);

export const undoChallengeDayVideoController = asyncMiddleWare(
  async (req: Request, res: Response) => {
    const { id: userId } = req.user!;
    const { userChallengeId, challengeDayVideoId } = req.validatedParams as CompleteVideoParams;
    await undoChallengeVideo(userChallengeId, challengeDayVideoId, userId);

    res.status(204).send();
  },
);

//  '/:userChallengeId/days/:dayNumber/complete',
export const completeChallengeDayController = asyncMiddleWare(
  async (req: Request, res: Response) => {
    const { id: userId } = req.user!;
    const { userChallengeId, dayNumber } = req.validatedParams as CompleteDayParams;

    await completeChallengeDay(userChallengeId, dayNumber, userId);

    res.status(204).send();
  },
);

export const undoChallengeDayController = asyncMiddleWare(async (req: Request, res: Response) => {
  const { id: userId } = req.user!;
  const { userChallengeId, dayNumber } = req.validatedParams as CompleteDayParams;

  await undoChallengeDay(userChallengeId, dayNumber, userId);

  res.status(204).send();
});
