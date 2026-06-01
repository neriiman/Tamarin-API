import type { GetChallengesQuery } from '../validators/challenges.validation.js';
import { getChallengeByIdFromDb, getChallengesFromDB } from '../db/challenges.repo.js';
import { AppError } from '../errors/AppError.js';
import { createChallengeSlug } from '../utils/slugify.js';
import type { ChallengeWithSlug } from '../types/challenge.type.js';

export const getChallenges = async (query: GetChallengesQuery) => {
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
