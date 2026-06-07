import {
  getUserChallengesFromDb,
  markUserChallengeCompletedInDb,
  markUserChallengeAbandonedInDb,
} from '../db/userChallenges.repo.js';
import { AppError } from '../errors/AppError.js';
import type { GetUserChallengesQuery } from '../validators/userChallenges.validation.js';

export const getUserChallenges = async (userId: string, query: GetUserChallengesQuery) => {
  return await getUserChallengesFromDb(userId, query);
};

export const abandonChallenge = async (userChallengeId: string, userId: string) => {
  const result = await markUserChallengeAbandonedInDb(userChallengeId, userId);
  if (!result) throw new AppError('Challenge not found or not active', 404);
  return result;
};

export const completeChallenge = async (userChallengeId: string, userId: string) => {
  const result = await markUserChallengeCompletedInDb(userChallengeId, userId);
  if (!result) throw new AppError('Challenge not found or not active', 404);
  return result;
};
