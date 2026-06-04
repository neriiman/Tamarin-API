import { pool } from '../config/db.js';
import type { Video } from '../types/video.type.js';

export const checkFavourite = async (userId: string, videoId: string): Promise<boolean> => {
  const { rows } = await pool.query(
    `
    SELECT EXISTS(
      SELECT 1 
        FROM user_favourites
        WHERE user_id = $1
        AND video_id = $2
    ) AS exists
    `,
    [userId, videoId],
  );

  return rows[0].exists;
};

export const addFavourite = async (userId: string, videoId: string) => {
  await pool.query(
    `
        INSERT INTO user_favourites
        (user_id, video_id)
        VALUES
        ($1, $2)
        ON CONFLICT DO NOTHING
        `,
    [userId, videoId],
  );
};

export const removeFavourite = async (userId: string, videoId: string) => {
  await pool.query(
    `
        DELETE FROM user_favourites
        WHERE user_id = $1
        AND video_id = $2
        `,
    [userId, videoId],
  );
};

export const getFavouritesByUser = async (userId: string): Promise<Video[]> => {
  const { rows } = await pool.query(
    `
    select v.*
    from videos v
    JOIN user_favourites uf
      ON uf.video_id = v.id
    WHERE uf.user_id = $1
    ORDER BY uf.created_at DESC
    `,
    [userId],
  );
  return rows;
};
