import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';

type JwtPayload = {
  userId: string;
};
export const generateAccessToken = (payload: JwtPayload) => {
  return jwt.sign(payload, env.JWT_SECRET, {
    expiresIn: env.ACCESS_TOKEN_EXPIRES_IN,
  });
};

export const generateRefreshToken = (payload: JwtPayload) => {
  return jwt.sign(payload, env.JWT_REFRESH_SECRET, {
    expiresIn: env.REFRESH_TOKEN_EXPIRES_IN,
  });
};

export const verifyAccessToken = (accessToken: string) => {
  return jwt.verify(accessToken, env.JWT_SECRET) as JwtPayload;
};

export const verifyRefreshToken = (refreshToken: string) => {
  return jwt.verify(refreshToken, env.JWT_REFRESH_SECRET) as JwtPayload;
};
