import e from 'express';
import { authMiddleware } from '../middleware/auth.middleware.js';

import {
  validateCompleteVideoParams,
  validateGetUserChallengesQuery,
  validateUserChallengeId,
} from '../validators/userChallenges.validation.js';
import {
  abandonChallengeController,
  completeChallengeController,
  completeChallengeDayVideoController,
  getUserChallengesController,
  undoChallengeDayVideoController,
} from '../controllers/userChallenges.controller.js';

const router = e.Router();

router.get('/', authMiddleware, validateGetUserChallengesQuery, getUserChallengesController);

router.patch(
  '/:userChallengeId/abandon',
  authMiddleware,
  validateUserChallengeId,
  abandonChallengeController,
);

router.patch(
  '/:userChallengeId/complete',
  authMiddleware,
  validateUserChallengeId,
  completeChallengeController,
);

router.post(
  '/:userChallengeId/videos/:challengeDayVideoId/complete',
  authMiddleware,
  validateCompleteVideoParams,
  completeChallengeDayVideoController,
);

router.delete(
  '/:userChallengeId/videos/:challengeDayVideoId/complete',
  authMiddleware,
  validateCompleteVideoParams,
  undoChallengeDayVideoController,
);

export default router;
