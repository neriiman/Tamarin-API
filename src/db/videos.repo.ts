import { pool } from '../config/db.js';
import type { Video, VideosWithTotalCount } from '../types/video.type.js';
import { sql } from '../utils/sqlBuilder.js';
import type { GetVideosQuery } from '../validators/video.validation.js';

export const getVideosFromDb = async (query: GetVideosQuery): Promise<VideosWithTotalCount> => {
  const { page, limit, type, search, sort, order, userId } = query;

  const offset = (page - 1) * limit;
  const q = sql();

  if (type) {
    const p = q.addValue(type);
    q.addWhere(`v.type = ${p}`);
  }

  if (search) {
    const p = q.addValue(search);
    q.addWhere(`v.title ILIKE '%' || ${p} || '%'`);
  }

  const countValues = [...q.values];

  const userIdParam = q.addValue(userId);
  const limitParam = q.addValue(limit);
  const offsetParam = q.addValue(offset);

  const dataValues = q.values;
  const whereSql = q.where.length ? `WHERE ${q.where.join(' AND ')}` : '';

  const isFavouritedSql = `
  CASE
        WHEN ${userIdParam}::uuid  IS NULL THEN false
        ELSE EXISTS (
          SELECT 1
          FROM user_favourites uf
          WHERE uf.video_id = v.id
          AND uf.user_id = ${userIdParam}::uuid
        )
  END AS "is_favourited"
  `;

  const dataSql = `
    SELECT v.*,
    ${isFavouritedSql}
    FROM videos v
    ${whereSql}
    ORDER BY v.${sort} ${order}
    LIMIT ${limitParam}
    OFFSET ${offsetParam}
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

export const getVideoByIdFromDb = async (
  videoId: string,
  userId: string | null,
): Promise<Video | null> => {
  const isFavouritedSql = `
  CASE
        WHEN $2::uuid  IS NULL THEN false
        ELSE EXISTS (
          SELECT 1
          FROM user_favourites uf
          WHERE uf.video_id = v.id
          AND uf.user_id = $2::uuid
        )
  END AS "is_favourited"
  `;
  const result = await pool.query(
    `
    SELECT v.*,
    ${isFavouritedSql}
    FROM videos v
    WHERE v.id = $1
    `,
    [videoId, userId],
  );

  return result.rows[0] ?? null;
};
