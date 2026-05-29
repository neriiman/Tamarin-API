import e from 'express';

import { validateQuery } from '../middleware/validate.middleware.js';
import { getChallengesQuerySchema } from '../validators/challenges.validation.js';
import { getChallengesController } from '../controllers/challenges.controller.js';

const challengesRoutes = e.Router();

challengesRoutes.get('/', validateQuery(getChallengesQuerySchema), getChallengesController);
// challengesRoutes.get('/:id', );  inte börjat än...

export default challengesRoutes;
