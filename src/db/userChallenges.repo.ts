import { pool } from '../config/db.js';
import type { UserChallenge } from '../types/userChallenge.type.js';

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

export const getActiveChallengeFromDb = async (userId: string): Promise<UserChallenge | null> => {
  const { rows } = await pool.query(
    `
        SELECT
            id,
            user_id AS "userId",
            challenge_id AS "challengeId",
            started_at AS "startedAt",
            completed_at AS "completedAt",
            status 
        FROM user_challenges
        WHERE user_id = $1
            AND status = 'active'
        LIMIT 1;
        `,
    [userId],
  );
  return rows[0] ?? null;
};
