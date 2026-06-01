import { getCategoriesFromDb } from '../db/categories.repo.js';

export const getCategories = async () => {
  const categories = await getCategoriesFromDb();
  return {
    result: categories.length,
    categories,
  };
};
