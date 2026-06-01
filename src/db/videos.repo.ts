import { pool } from '../config/db.js';
import type { Video } from '../types/video.type.js';

export const getVideoByIdInDb = async (id: string): Promise<Video | null> => {
  const result = await pool.query(
    `
        SELECT * FROM videos
        WHERE id = $1

        `,
    [id],
  );
  return result.rows[0] ?? null;
};
