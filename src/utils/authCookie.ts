import type { Response } from 'express';
import { env } from '../config/env.js';

export const setRefreshCookie = (res: Response, token: string) => {
  res.cookie('refreshToken', token, {
    httpOnly: true,
    secure: env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 1000 * 60 * 60 * 24 * 7,
  });
};

export const clearRefreshToken = (res: Response) => {
  res.clearCookie('refreshToken');
};
