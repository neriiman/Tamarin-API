import { pool } from '../config/db.js';
import type { UserChallenge } from '../types/userChallenge.type.js';
import { sql } from '../utils/sqlBuilder.js';
import type { GetUserChallengesQuery } from '../validators/userChallenges.validation.js';

export const startChallengeInDb = async (userId: string, challengeId: string): Promise<string> => {
  const { rows } = await pool.query(
    `
        INSERT INTO user_challenges
        (user_id, challenge_id)
        VALUES
        ($1,   $2)
        RETURNING id;
        `,
    [userId, challengeId],
  );
  return rows[0].id;
};

export const getActiveUserChallengeFromDb = async (
  userId: string,
): Promise<UserChallenge | null> => {
  const { rows } = await pool.query(
    `
        SELECT *
        FROM user_challenges
        WHERE user_id = $1
            AND status = 'active'
        LIMIT 1;
        `,
    [userId],
  );
  return rows[0] ?? null;
};

export const getUserChallengesFromDb = async (
  userId: string,
  query: GetUserChallengesQuery,
): Promise<UserChallenge[]> => {
  const q = sql();
  q.addWhere(`user_id = ${q.addValue(userId)}`);

  if (query.status === 'history') {
    q.addWhere(`
      status IN ('completed', 'abandoned' , 'paused')
      `);
  } else if (query.status) {
    q.addWhere(`
      status = ${q.addValue(query.status)}
      `);
  }

  const whereSql = q.where.length ? `WHERE ${q.where.join(' AND ')}` : '';

  const { rows } = await pool.query(
    `
        SELECT *
        FROM user_challenges
         ${whereSql}
        ORDER BY started_at DESC;
        `,
    q.values,
  );
  return rows;
};

export const markUserChallengeCompletedInDb = async (
  userChallengeId: string,
  userId: string,
): Promise<string | null> => {
  const { rows } = await pool.query(
    `
    UPDATE user_challenges
    SET 
      status = 'completed' ,
      completed_at = NOW()
    WHERE id = $1
      AND user_id =  $2
      And status = 'active' 
    RETURNING id
    `,
    [userChallengeId, userId],
  );
  if (rows.length === 0) return null;

  return rows[0].id;
};

export const markUserChallengeAbandonedInDb = async (
  userChallengeId: string,
  userId: string,
): Promise<string | null> => {
  const { rows } = await pool.query(
    `
    UPDATE user_challenges
    SET 
      status = 'abandoned' ,
      abandoned_at = NOW()
    WHERE id = $1
      AND user_id =  $2
      And status = 'active' 
    RETURNING id
    `,
    [userChallengeId, userId],
  );
  if (rows.length === 0) return null;

  return rows[0].id;
};
