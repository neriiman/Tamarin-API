import e from 'express';

import { validateParams, validateQuery } from '../middleware/validate.middleware.js';
import {
  getChallengeByIdSchema,
  getChallengesQuerySchema,
} from '../validators/challenges.validation.js';
import {
  getChallengeByIdController,
  getChallengesController,
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

export default challengesRoutes;
