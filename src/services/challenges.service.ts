import type { GetChallengesQuery } from '../validators/challenges.validation.js';
import { getChallengeByIdFromDb, getChallengesFromDB } from '../db/challenges.repo.js';
import { AppError } from '../errors/AppError.js';
import { createChallengeSlug } from '../utils/slugify.js';
import type { ChallengesWithMeta, ChallengeWithSlug } from '../types/challenge.type.js';
import { getActiveUserChallengeFromDb, startChallengeInDb } from '../db/userChallenges.repo.js';

export const getChallenges = async (query: GetChallengesQuery): Promise<ChallengesWithMeta> => {
  const { data, totalCount } = await getChallengesFromDB(query);
  const { page, limit } = query;

  const results = data.length;
  const totalPages = Math.max(1, Math.ceil(totalCount / limit));
  const hasNextPage = page < totalPages;

  const challenges: ChallengeWithSlug[] = data.map((c) => ({
    ...c,
    slug: createChallengeSlug(c.title, c.created_at),
  }));
  return {
    results,
    page,
    limit,
    totalCount,
    totalPages,
    hasNextPage,
    data: challenges,
  };
};

export const getChallengeById = async (id: string): Promise<ChallengeWithSlug> => {
  const challenge = await getChallengeByIdFromDb(id);
  if (!challenge) throw new AppError('Challenge not found', 404);

  return {
    ...challenge,
    slug: createChallengeSlug(challenge.title, challenge.created_at),
  };
};

export const startChallenge = async (userId: string, challengeId: string) => {
  await getChallengeById(challengeId);

  const active = await getActiveUserChallengeFromDb(userId);
  if (active) throw new AppError('User already has an active challenge', 409);
  const userChallengeId = await startChallengeInDb(userId, challengeId);
  return { userChallengeId };
};
