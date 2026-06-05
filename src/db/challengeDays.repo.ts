import { pool } from '../config/db.js';
import type { ChallengeDaySummary } from '../types/challengeDays.type.js';

export const getChallengeDaysFromDb = async (
  challengeId: string,
): Promise<ChallengeDaySummary[]> => {
  const { rows } = await pool.query(
    `
        SELECT day_number AS  "dayNumber",
        is_rest_day AS "isRestDay"
        FROM challenge_days
        WHERE challenge_id = $1
        ORDER BY day_number;
    `,
    [challengeId],
  );
  return rows;
};

export const getChallengeDayMetaDataFromDb = async (
  challengeId: string,
  dayNumber: number,
): Promise<ChallengeDaySummary | null> => {
  const { rows } = await pool.query(
    `
        SELECT day_number AS  "dayNumber",
        is_rest_day AS "isRestDay"
        FROM challenge_days
        WHERE challenge_id = $1
          AND day_number= $2
        ORDER BY day_number;
    `,
    [challengeId, dayNumber],
  );
  return rows[0] ?? null;
};
