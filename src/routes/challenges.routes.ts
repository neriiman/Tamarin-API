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

const challengesRoutes = e.Router();

challengesRoutes.get('/', validateQuery(getChallengesQuerySchema), getChallengesController);
challengesRoutes.get('/:id', validateParams(getChallengeByIdSchema), getChallengeByIdController);

export default challengesRoutes;
