import type { GetChallengesQuery } from '../validators/challenges.validation.js';
import { getChallengesFromDB } from '../db/challenges.repo.js';

export const getChallenges = async (query: GetChallengesQuery) => {
  const { data, totalCount } = await getChallengesFromDB(query);
  const { page, limit } = query;

  const results = data.length;
  const totalPages = Math.ceil(totalCount / limit);
  const hasNextPage = page < totalPages;
  return {
    results,
    page,
    limit,
    totalCount,
    totalPages,
    hasNextPage,
    data,
  };
};
