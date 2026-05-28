import type { NextFunction, Request, Response } from 'express';
import { AppError } from '../errors/AppError.js';
import { verifyAccessToken } from '../utils/jwt.js';

export const auth = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) throw new AppError('Unauthorized', 401);

  const token = authHeader.split(' ')[1];
  const decoded = verifyAccessToken(token!);
  req.user = {
    id: decoded.userId,
  };
  next();
};
