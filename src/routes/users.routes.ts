import e from 'express';
import { validateBody } from '../middleware/validate.middleware.js';
import { signUpSchema } from '../validators/auth.validation.js';
import { findMe, signUpController } from '../controllers/users.controller.js';
import { auth } from '../middleware/auth.middleware.js';

const usersRoutes = e.Router();

usersRoutes.post('/signUp', validateBody(signUpSchema), signUpController);
usersRoutes.get('/me', auth, findMe);

export default usersRoutes;
