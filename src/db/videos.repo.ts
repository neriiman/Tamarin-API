import { pool } from '../config/db.js';
import type { Video, VideosWithTotalCount } from '../types/video.type.js';
import type { GetVideosQuery } from '../validators/video.validation.js';

export const getVideosFromDb = async (query: GetVideosQuery): Promise<VideosWithTotalCount> => {
  const { page, limit, type, search, sort, order, userId } = query;

  const offset = (page - 1) * limit;

  // base param (userId for favorites)
  const baseValues = [userId ? String(userId) : null];
  // filter values shared between data + count
  const filterValues: (string | number)[] = [];
  const whereParts: string[] = [];

  let i = 1;

  // filters
  if (type) {
    i++;
    whereParts.push(`v.type = $${i}`);
    filterValues.push(type);
  }

  if (search) {
    i++;
    whereParts.push(`v.title ILIKE '%' || $${i} || '%'`);
    filterValues.push(search);
  }

  const whereSql = whereParts.length ? `WHERE ${whereParts.join(' AND ')}` : '';

  // FINAL values
  const dataValues = [userId ?? null, ...filterValues, limit, offset];
  const countValues = [userId ?? null, ...filterValues];

  // indexes (simple + stable)
  const limitIndex = dataValues.length - 1;
  const offsetIndex = dataValues.length;

  const dataSql = `
    SELECT v.*,
    CASE
  WHEN $1 IS NULL THEN false
  ELSE EXISTS (
    SELECT 1
    FROM user_favourites uf
    WHERE uf.video_id = v.id
    AND uf.user_id = $1::uuid
  )
END AS "isFavourited"
    FROM videos v
    ${whereSql}
    ORDER BY v.${sort} ${order}
    LIMIT $${limitIndex}
    OFFSET $${offsetIndex}
  `;

  const countSql = `
    SELECT COUNT(*) AS total_count
    FROM videos v
    ${whereSql}
  `;

  const [dataResult, countResult] = await Promise.all([
    pool.query(dataSql, dataValues),
    pool.query(countSql, countValues),
  ]);

  return {
    data: dataResult.rows,
    totalCount: Number(countResult.rows[0].total_count),
  };
};

// SINGLE VIDEO
export const getVideoByIdFromDb = async (
  videoId: string,
  userId: string | null,
): Promise<Video | null> => {
  const result = await pool.query(
    `
    SELECT v.*,
      CASE
        WHEN $2::uuid IS NULL THEN false
        ELSE EXISTS (
          SELECT 1
          FROM user_favourites uf
          WHERE uf.video_id = v.id
          AND uf.user_id = $2::uuid
        )
      END AS "is_favourited"
    FROM videos v
    WHERE v.id = $1
    `,
    [videoId, userId ?? null],
  );

  return result.rows[0] ?? null;
};
