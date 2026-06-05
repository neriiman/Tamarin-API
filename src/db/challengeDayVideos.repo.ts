import { pool } from '../config/db.js';
import type { ChallengeDayVideo } from '../types/challengeDayVideos.type.js';

export const getChallengeDayVideosFromDb = async (
  challengeId: string,
  dayNumber: number,
): Promise<ChallengeDayVideo[]> => {
  const { rows } = await pool.query(
    `
    SELECT v.*, 
    cdv.order_index AS "orderIndex" ,
    cdv.is_optional AS "IsOptional"

    FROM challenge_day_videos AS cdv 
    JOIN videos v 
      ON cdv.video_id = v.id
    WHERE cdv.challenge_id = $1
      AND cdv.day_number = $2
    ORDER BY cdv.order_index;
        `,
    [challengeId, dayNumber],
  );

  return rows;
};
