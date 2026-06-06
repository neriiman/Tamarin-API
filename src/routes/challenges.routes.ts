import e from 'express';

import { validateParams, validateQuery } from '../middleware/validate.middleware.js';
import {
  getChallengeByIdSchema,
  getChallengesQuerySchema,
  startChallengeSchema,
  type startChallengeParams,
} from '../validators/challenges.validation.js';
import {
  getChallengeByIdController,
  getChallengesController,
  startChallengeController,
} from '../controllers/challenges.controller.js';
import {
  getChallengeDaysSchema,
  getChallengeDayVideosSchema,
  type GetChallengeDaysParams,
  type GetChallengeDayVideosParams,
} from '../validators/challengeDay.validation.js';
import {
  getChallengeDaysController,
  getChallengeDayWithVideosController,
} from '../controllers/challengeDay.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

const challengesRoutes = e.Router();

challengesRoutes.get('/', validateQuery(getChallengesQuerySchema), getChallengesController);

challengesRoutes.get('/:id', validateParams(getChallengeByIdSchema), getChallengeByIdController);

challengesRoutes.get(
  '/:challengeId/days',
  validateParams<GetChallengeDaysParams>(getChallengeDaysSchema),
  getChallengeDaysController,
);

challengesRoutes.get(
  '/:challengeId/days/:dayNumber',
  validateParams<GetChallengeDayVideosParams>(getChallengeDayVideosSchema),
  getChallengeDayWithVideosController,
);

challengesRoutes.post(
  '/:challengeId/start/',
  authMiddleware,
  validateParams<startChallengeParams>(startChallengeSchema),
  startChallengeController,
);

export default challengesRoutes;
