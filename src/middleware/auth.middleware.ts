import type { NextFunction, Request, Response } from 'express';
import { AppError } from '../errors/AppError.js';
import { verifyAccessToken } from '../utils/jwt.js';

const getBearerToken = (req: Request) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) return null;

  return authHeader.split(' ')[1];
};

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = getBearerToken(req);
  if (!token) throw new AppError('Unauthorized', 401);

  const decoded = verifyAccessToken(token);
  req.user = {
    id: decoded.userId,
  };
  next();
};
export const optionalAuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = getBearerToken(req);
  if (!token) return next();

  try {
    const decoded = verifyAccessToken(token);
    req.user = {
      id: decoded.userId,
    };
  } catch {
    // treat user as guest
  }
  next();
};
