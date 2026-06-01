import { getVideoByIdInDb } from '../db/videos.repo.js';
import { AppError } from '../errors/AppError.js';

export const getVideoById = async (id: string) => {
  const video = await getVideoByIdInDb(id);
  if (!video) throw new AppError('Video not found', 404);
  return video;
};
