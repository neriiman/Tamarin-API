import { pool } from '../config/db.js';
import type { Video, VideosWithTotalCount } from '../types/video.type.js';
import type { getVideosQuery } from '../validators/video.validation.js';

export const getVideosFromDb = async (query: getVideosQuery): Promise<VideosWithTotalCount> => {
  const { page, limit, type, search, sort, order } = query;
  const offset = (page - 1) * limit;

  const whereParts: string[] = [];
  const values: (number | string)[] = [];
  let i = 1;
  if (type) {
    whereParts.push(`type = $${i}`);
    values.push(type);
    i++;
  }
  if (search) {
    whereParts.push(`title ILIKE '%' || $${i} || '%'`);
    values.push(search);
    i++;
  }

  const whereSql = whereParts.length ? `WHERE ${whereParts.join(' AND ')}` : '';

  values.push(limit, offset);

  const dataSql = `
  SELECT * 
  FROM videos
  ${whereSql}
  ORDER BY ${sort} ${order}
  LIMIT $${i}
  OFFSET $${i + 1}
  `;

  const countSql = `
  SELECT COUNT(*) AS total_count
  FROM videos
  ${whereSql}
  `;
  const [dataResult, countResult] = await Promise.all([
    pool.query(dataSql, values),
    pool.query(countSql, values.slice(0, i - 1)),
  ]);

  return {
    data: dataResult.rows,
    totalCount: Number(countResult.rows[0].total_count),
  };
};

export const getVideoByIdFromDb = async (id: string): Promise<Video | null> => {
  const result = await pool.query(
    `
        SELECT * FROM videos
        WHERE id = $1

        `,
    [id],
  );
  return result.rows[0] ?? null;
};
