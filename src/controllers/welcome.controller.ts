import type { Request, Response } from 'express';
import { asyncMiddleWare } from '../middleware/async.middleware.js';

export const welcomeContoller = asyncMiddleWare(async (req: Request, res: Response) => {
  res.send('Välkommen till Tamarin API! ');
});
