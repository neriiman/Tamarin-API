import e from 'express';
import { authMiddleware } from '../middleware/auth.middleware.js';
import { validateQuery } from '../middleware/validate.middleware.js';
import {
  getUserChallengesQuerySchema,
  type GetUserChallengesQuery,
} from '../validators/userChallenges.validation.js';
import { getUserChallengesController } from '../controllers/userChallenges.controller.js';

const router = e.Router();

router.get(
  '/',
  authMiddleware,
  validateQuery<GetUserChallengesQuery>(getUserChallengesQuerySchema),
  getUserChallengesController,
);

export default router;
