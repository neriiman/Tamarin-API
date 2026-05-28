import type { Request, Response } from 'express';
import { asyncMiddleWare } from '../middleware/async.middleware.js';
import { signIn } from '../services/auth.service.js';
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from '../utils/jwt.js';
import { clearRefreshToken, setRefreshCookie } from '../utils/authCookie.js';
import { AppError } from '../errors/AppError.js';

export const refreshController = asyncMiddleWare(async (req: Request, res: Response) => {
  const token = req.cookies.refreshToken;
  if (!token) throw new AppError('unauthorized', 401);

  const decoded = verifyRefreshToken(token);

  const accessToken = generateAccessToken({ userId: decoded.userId });
  const refreshToken = generateRefreshToken({ userId: decoded.userId });

  setRefreshCookie(res, refreshToken);
  res.status(200).json({ accessToken });
});

export const signInController = asyncMiddleWare(async (req: Request, res: Response) => {
  const user = await signIn(req.body);
  const accessToken = generateAccessToken({ userId: user.id });
  const refreshToken = generateRefreshToken({ userId: user.id });
  setRefreshCookie(res, refreshToken);

  res.status(200).json({
    message: 'User successfully logged in',
    data: { user },
    accessToken,
  });
});

export const signOutController = asyncMiddleWare(async (req: Request, res: Response) => {
  clearRefreshToken(res);

  res.status(200).json({ message: 'user signed out successfully' });
});
