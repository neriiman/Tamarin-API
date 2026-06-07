import {
  getUserChallengesFromDb,
  markUserChallengeCompletedInDb,
  markUserChallengeAbandonedInDb,
  completeChallengeVideoInDb,
  undoChallengeDayVideoInDb,
  getOwnedUserChallengeByIdFromDb,
  userChallengeOwnsVideoInDb,
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

export const completeChallengeVideo = async (
  userChallengeId: string,
  challengeDayVideoId: string,
  userId: string,
) => {
  const ownsChallenge = await getOwnedUserChallengeByIdFromDb(userChallengeId, userId);
  if (!ownsChallenge) throw new AppError('Challenge not found', 404);
  const belongs = await userChallengeOwnsVideoInDb(userChallengeId, challengeDayVideoId);
  if (!belongs) throw new AppError('Video does not belong to challenge', 400);
  await completeChallengeVideoInDb(userChallengeId, challengeDayVideoId);
};

export const undoChallengeVideo = async (
  userChallengeId: string,
  challengeDayVideoId: string,
  userId: string,
) => {
  const ownsChallenge = await getOwnedUserChallengeByIdFromDb(userChallengeId, userId);
  if (!ownsChallenge) throw new AppError('Challenge not found', 404);
  const belongs = await userChallengeOwnsVideoInDb(userChallengeId, challengeDayVideoId);
  if (!belongs) throw new AppError('Video does not belong to challenge', 400);
  await undoChallengeDayVideoInDb(userChallengeId, challengeDayVideoId);
};
