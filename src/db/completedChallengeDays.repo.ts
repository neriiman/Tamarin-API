import { pool } from '../config/db.js';

export const challengeDayExistsInDb = async (userChallengeId: string, dayNumber: number) => {
  const { rows } = await pool.query(
    `
        SELECT 1
        FROM challenge_days
        WHERE
          challenge_id = (
           SELECT challenge_id
           FROM user_challenges
           WHERE id = $1
           )
          AND day_number = $2
        LIMIT 1     
        `,
    [userChallengeId, dayNumber],
  );

  return rows.length > 0;
};

export const isChallengeDayCompletedInDb = async (userChallengeId: string, dayNumber: number) => {
  const { rows } = await pool.query(
    `
        SELECT 1
        FROM completed_challenge_days
        WHERE
          user_challenge_id = $1
          AND day_number = $2
        LIMIT 1     
        `,
    [userChallengeId, dayNumber],
  );

  return rows.length > 0;
};

export const completeChallengeDayInDb = async (userChallengeId: string, dayNumber: number) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    await client.query(
      `
          INSERT INTO completed_challenge_days
              (user_challenge_id, day_number)
          VALUES
              ($1, $2)
          ON CONFLICT DO NOTHING        
          `,
      [userChallengeId, dayNumber],
    );

    await client.query(
      `
          INSERT INTO completed_challenge_day_videos
          (user_challenge_id, challenge_day_video_id)
  
          SELECT
              $1,
              cdv.id
          
          FROM challenge_day_videos cdv
          WHERE
              cdv.challenge_id = (
                  SELECT challenge_id
                  FROM user_challenges 
                  WHERE id =$1
                  )
              AND cdv.day_number = $2
  
          ON CONFLICT DO NOTHING
           `,
      [userChallengeId, dayNumber],
    );

    await client.query('COMMIT');
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
};

export const undoChallengeDayInDb = async (userChallengeId: string, dayNumber: number) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    await client.query(
      `
          DELETE FROM completed_challenge_days
          WHERE user_challenge_id = $1
              AND day_number >= $2      
          `,
      [userChallengeId, dayNumber],
    );

    await client.query(
      `
          DELETE FROM completed_challenge_day_videos ccdv
  
          USING challenge_day_videos cdv
  
          WHERE
              ccdv.challenge_day_video_id = cdv.id
              AND ccdv.user_challenge_id = $1
              AND cdv.challenge_id = (
                  SELECT challenge_id 
                  FROM user_challenges
                  WHERE id = $1
              )
              AND cdv.day_number >= $2
  
          `,
      [userChallengeId, dayNumber],
    );

    await client.query('COMMIT');
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
};
