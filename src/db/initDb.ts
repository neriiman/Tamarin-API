import type { PoolClient } from 'pg';
import { pool } from '../config/db.js';
import logger from '../config/logger.js';

export const initDb = async () => {
  let client: PoolClient | undefined;
  try {
    client = await pool.connect();
    logger.info('Connected to database ');
  } finally {
    client?.release();
  }
};
