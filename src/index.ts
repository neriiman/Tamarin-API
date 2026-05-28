import 'dotenv/config';
import app from './app.js';
import logger from './config/logger.js';
import { initDb } from './db/initDb.js';
import { env } from './config/env.js';

const port = Number(env.PORT || 3000);

const start = async () => {
  try {
    await initDb();
    app.listen(port, () => logger.info(`server is running on http://localhost:${port}`));
  } catch (error) {
    logger.error(error);
    process.exit(1);
  }
};

start();
