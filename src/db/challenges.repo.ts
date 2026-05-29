import type { ChallengesWithMeta } from '../types/challenge.type.js';
import type { GetChallengesQuery } from '../validators/challenges.validation.js';
import { pool } from '../config/db.js';

export const getChallengesFromDB = async (
  query: GetChallengesQuery,
): Promise<ChallengesWithMeta> => {
  const { page, limit, sort, order, search } = query;
  const offset = (page - 1) * limit;
  const baseWhere = search
    ? `
  WHERE 
      title ILIKE '%'  | |  $1  | |  '%'
  `
    : '';

  const dataValues = search ? [search, limit, offset] : [limit, offset];

  const dataSql = search
    ? `
  SELECT * 
  FROM challenges
  ${baseWhere}
  ORDER BY ${sort} ${order}
  LIMIT $2 OFFSET $3
  `
    : `
    SELECT * 
    FROM challenges 
    ORDER BY ${sort} ${order}
    LIMIT $1 OFFSET $2
    `;

  const countSql = search
    ? `
  SELECT COUNT(*) AS total_count
  FROM challenges
  ${baseWhere}
  `
    : `
    SELECT COUNT(*)  total_count
    FROM challenges
    `;
  const [dataResult, countResult] = await Promise.all([
    pool.query(dataSql, dataValues),
    search ? pool.query(countSql, [search]) : pool.query(countSql),
  ]);

  const totalCount = Number(countResult.rows[0].total_count);

  return {
    data: dataResult.rows,
    totalCount,
  };
};
