import e from 'express';
import { authMiddleware } from '../middleware/auth.middleware.js';

import {
  validateGetUserChallengesQuery,
  validateUserChallengeId,
} from '../validators/userChallenges.validation.js';
import {
  abandonChallengeController,
  completeChallengeController,
  getUserChallengesController,
} from '../controllers/userChallenges.controller.js';

const router = e.Router();

router.get('/', authMiddleware, validateGetUserChallengesQuery, getUserChallengesController);

router.patch('/:id/abandon', authMiddleware, validateUserChallengeId, abandonChallengeController);

router.patch('/:id/complete', authMiddleware, validateUserChallengeId, completeChallengeController);

export default router;
