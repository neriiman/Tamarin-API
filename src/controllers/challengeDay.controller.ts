import { asyncMiddleWare } from '../middleware/async.middleware.js';
import { getChallengeDays, getChallengeDayWithVideos } from '../services/challengeDays.service.js';
import type {
  GetChallengeDaysParams,
  GetChallengeDayVideosParams,
} from '../validators/challengeDay.validation.js';

export const getChallengeDaysController = asyncMiddleWare(async (req, res) => {
  const { challengeId } = req.validatedParams as GetChallengeDaysParams;

  const days = await getChallengeDays(challengeId);
  res.status(200).json({ days });
});

export const getChallengeDayWithVideosController = asyncMiddleWare(async (req, res) => {
  const { challengeId, dayNumber } = req.validatedParams as GetChallengeDayVideosParams;

  const data = await getChallengeDayWithVideos(challengeId, dayNumber);
  res.status(200).json({ data });
});
