import e from 'express';
import { getCategoriesController } from '../controllers/categories.controller.js';

const categoriesRouter = e.Router();

categoriesRouter.get('/', getCategoriesController);

export default categoriesRouter;
