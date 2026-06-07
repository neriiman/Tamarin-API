import e from 'express';
import {
  refreshController,
  signInController,
  signOutController,
} from '../controllers/auth.controller.js';
import { validateBody } from '../middleware/validate.middleware.js';
import { signInSchema } from '../validators/auth.validation.js';

const router = e.Router();

router.post('/signIn', validateBody(signInSchema), signInController);
router.post('/refresh', refreshController);
router.post('/signOut', signOutController);

export default router;
