import e from 'express';
import { getCategoriesController } from '../controllers/categories.controller.js';

const router = e.Router();

router.get('/', getCategoriesController);

export default router;
