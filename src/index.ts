import 'dotenv/config';
import app from './app.js';
import logger from './config/logger.js';

const port = Number(process.env.PORT ?? 3000);

app.listen(port, () => logger.info(`server is running on http://localhost:${port}`));
