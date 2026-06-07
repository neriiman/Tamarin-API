import { getUserChallengesFromDb } from '../db/userChallenges.repo.js';
import type { GetUserChallengesQuery } from '../validators/userChallenges.validation.js';

export const getUserChallenges = async (userId: string, query: GetUserChallengesQuery) => {
  return await getUserChallengesFromDb(userId, query);
};
