import { getVideoByIdFromDb, getVideosFromDb } from '../db/videos.repo.js';
import { AppError } from '../errors/AppError.js';
import type { VideosWithMeta } from '../types/video.type.js';
import type { getVideosQuery } from '../validators/video.validation.js';

export const getVideos = async (query: getVideosQuery): Promise<VideosWithMeta> => {
  const { data, totalCount } = await getVideosFromDb(query);
  const { page, limit } = query;
  const totalPages = Math.ceil(totalCount / limit);
  const hasNextPage = page < totalPages;
  const results = data.length;

  return {
    results,
    data,
    page,
    limit,
    hasNextPage,
    totalCount,
    totalPages,
  };
};
export const getVideoById = async (id: string) => {
  const video = await getVideoByIdFromDb(id);
  if (!video) throw new AppError('Video not found', 404);
  return video;
};
