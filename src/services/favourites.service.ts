import {
  addFavourite,
  checkFavourite,
  getFavouritesByUser,
  removeFavourite,
} from '../db/favourites.repo.js';

export const toggleFavourite = async (userId: string, videoId: string) => {
  const exists = await checkFavourite(userId, videoId);
  if (exists) {
    await removeFavourite(userId, videoId);
    return { favourited: false };
  }
  await addFavourite(userId, videoId);
  return { favourited: true };
};

export const getFavourites = async (userId: string) => {
  return await getFavouritesByUser(userId);
};
