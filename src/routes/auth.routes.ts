import e from 'express';
import {
  refreshController,
  signInController,
  signOutController,
} from '../controllers/auth.controller.js';
import { validateBody } from '../middleware/validate.middleware.js';
import { signInSchema } from '../validators/auth.validation.js';

const authRoutes = e.Router();

authRoutes.post('/signIn', validateBody(signInSchema), signInController);
authRoutes.post('/refresh', refreshController);
authRoutes.post('/signOut', signOutController);

export default authRoutes;
