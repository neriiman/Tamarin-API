import type { Challenge, ChallengesWithMeta } from '../types/challenge.type.js';
import type { GetChallengesQuery } from '../validators/challenges.validation.js';
import { pool } from '../config/db.js';

export const getChallengesFromDB = async (
  query: GetChallengesQuery,
): Promise<ChallengesWithMeta> => {
  const { page, limit, sort, order, search, categoryId } = query;
  const offset = (page - 1) * limit;

  const whereParts: string[] = [];
  const values: (string | number)[] = [];
  let i = 1;
  if (search) {
    whereParts.push(`(
      ch.title ILIKE '%' || $${i} ||  '%' 
      OR description ILIKE '%' || $${i} ||  '%' 
      )`);
    values.push(search);
    i++;
  }

  if (categoryId) {
    whereParts.push(`
      EXISTS(
        SELECT 1
        FROM challenge_categories cc
        WHERE cc.challenge_id = ch.id
        AND cc.category_id = $${i}
      )
      `);
    values.push(categoryId);
    i++;
  }
  const whereSql = whereParts.length > 0 ? `WHERE ${whereParts.join(' AND ')}` : '';

  const dataSql = `
  SELECT ch.* ,
  COALESCE(
    json_agg(
      json_build_object(
      'id', c.id,
      'name', c.name
      )
    ) FILTER(
     WHERE c.id IS NOT  NULL
     ),
     '[]'
  ) AS categories

  FROM challenges ch
  LEFT JOIN challenge_categories cc
    ON cc.challenge_id = ch.id
  
    LEFT JOIN categories c
      ON c.id = cc.category_id

  ${whereSql}

  GROUP BY ch.id
  ORDER BY ch.${sort} ${order}
  LIMIT $${i} 
  OFFSET $${i + 1} 
  `;
  values.push(limit, offset);

  const countSql = `
  SELECT COUNT(DISTINCT ch.id) AS total_count
  FROM challenges ch
  LEFT JOIN challenge_categories cc
    ON cc.challenge_id = ch.id
  ${whereSql}
  `;

  const [dataResult, countResult] = await Promise.all([
    pool.query(dataSql, values),
    pool.query(countSql, values.slice(0, i - 1)),
  ]);

  const totalCount = Number(countResult.rows[0].total_count);

  return {
    data: dataResult.rows,
    totalCount,
  };
};

export const getChallengeByIdFromDb = async (id: string): Promise<Challenge> => {
  const result = await pool.query(
    `
    SELECT ch.*,
      COALESCE(
        json_agg(
          json_build_object(
          'id', c.id,
          'name', c.name
          )) FILTER (WHERE c.id IS NOT NULL)
      ,
      '[]') AS categories
    FROM challenges ch
    LEFT JOIN challenge_categories cc
      ON cc.challenge_id = ch.id
    LEFT JOIN categories c
      On c.id = cc.category_id
    WHERE ch.id = $1
    GROUP BY ch.id
    LIMIT 1
    `,
    [id],
  );

  return result.rows[0];
};
