import { getChallengeDayMetaDataFromDb, getChallengeDaysFromDb } from '../db/challengeDays.repo.js';
import { getChallengeDayVideosFromDb } from '../db/challengeDayVideos.repo.js';
import { AppError } from '../errors/AppError.js';
import type { ChallengeDayWithVideos } from '../types/challengeDayVideos.type.js';

export const getChallengeDays = async (id: string) => {
  return await getChallengeDaysFromDb(id);
};

export const getChallengeDayWithVideos = async (
  challengeId: string,
  dayNumber: number,
): Promise<ChallengeDayWithVideos> => {
  const day = await getChallengeDayMetaDataFromDb(challengeId, dayNumber);
  if (!day) throw new AppError('Challenge day was not found', 404);
  const videos = await getChallengeDayVideosFromDb(challengeId, dayNumber);

  return {
    dayNumber: day.dayNumber,
    isRestDay: day.isRestDay,
    videos: videos,
  };
};
