import { pool } from '../config/db.js';
import type { CategoryRow } from '../types/category.type.js';

export const getCategoriesFromDb = async (): Promise<CategoryRow[]> => {
  const { rows } = await pool.query(`
        SELECT *
        FROM categories
        ORDER BY name ASC`);
  return rows;
};
