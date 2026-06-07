import e from 'express';
import { welcomeContoller } from '../controllers/welcome.controller.js';

const router = e.Router();

router.get('/', welcomeContoller);

export default router;
