import e from 'express';
import { validateBody } from '../middleware/validate.middleware.js';
import { signUpSchema } from '../validators/auth.validation.js';
import { findMe, signUpController } from '../controllers/users.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

const router = e.Router();

router.post('/signUp', validateBody(signUpSchema), signUpController);
router.get('/me', authMiddleware, findMe);

export default router;
