import express from 'express';
import authRoutes from './routes/auth.routes.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { env } from './config/env.js';
import usersRoutes from './routes/users.routes.js';
import challengesRoutes from './routes/challenges.routes.js';

const app = express();

app.use(
  cors({
    origin: [env.WEB_APP_URL, env.WEB_APP_LOCALHOST],
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/challenges', challengesRoutes);

export default app;
