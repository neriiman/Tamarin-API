import e from 'express';
import { authMiddleware } from '../middleware/auth.middleware.js';
import { validateParams, validateQuery } from '../middleware/validate.middleware.js';
import {
  getUserChallengesQuerySchema,
  userChallengeIdSchema,
  type GetUserChallengesQuery,
  type userChallengeIdParams,
} from '../validators/userChallenges.validation.js';
import {
  abandonChallengeController,
  completeChallengeController,
  getUserChallengesController,
} from '../controllers/userChallenges.controller.js';

const router = e.Router();

router.get(
  '/',
  authMiddleware,
  validateQuery<GetUserChallengesQuery>(getUserChallengesQuerySchema),
  getUserChallengesController,
);

router.post(
  '/:id/abandon',
  authMiddleware,
  validateParams<userChallengeIdParams>(userChallengeIdSchema),
  abandonChallengeController,
);

router.post(
  '/:id/complete',
  authMiddleware,
  validateParams<userChallengeIdParams>(userChallengeIdSchema),
  completeChallengeController,
);

export default router;
