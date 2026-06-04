import express from 'express';
import authRoutes from './routes/auth.routes.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { env } from './config/env.js';
import usersRoutes from './routes/users.routes.js';
import challengesRoutes from './routes/challenges.routes.js';
import categoriesRouter from './routes/categories.routes.js';
import welcomeRoutes from './routes/welcome.routes.js';
import videosRouter from './routes/videos.routes.js';
import favouritesRouter from './routes/favourites.route.js';

const app = express();

app.use(
  cors({
    origin: [env.WEB_APP_URL, env.WEB_APP_LOCALHOST],
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

app.use('/', welcomeRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/challenges', challengesRoutes);
app.use('/api/categories', categoriesRouter);
app.use('/api/videos', videosRouter);
app.use('/api/favourites', favouritesRouter);

export default app;
