import e from 'express';
import { welcomeContoller } from '../controllers/welcome.controller.js';

const welcomeRoutes = e.Router();

welcomeRoutes.get('/', welcomeContoller);

export default welcomeRoutes;
