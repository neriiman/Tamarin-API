import type { Request, Response } from 'express';
import { asyncMiddleWare } from '../middleware/async.middleware.js';
import { setRefreshCookie } from '../utils/authCookie.js';
import { generateAccessToken, generateRefreshToken } from '../utils/jwt.js';
import { assertUserNotExtists, createUser } from '../services/auth.service.js';
import { findUserByIdInDb } from '../db/users.repo.js';
import { AppError } from '../errors/AppError.js';
import { toSafeUser } from '../mappers/user.mapper.js';

export const signUpController = asyncMiddleWare(async (req: Request, res: Response) => {
  const { username, email } = req.body;

  await assertUserNotExtists(username, email);

  const newUser = await createUser(req.body);

  const accessToken = generateAccessToken({ userId: newUser.id });
  const refreshToken = generateRefreshToken({ userId: newUser.id });

  setRefreshCookie(res, refreshToken);

  res.status(201).json({
    status: 'success',
    message: 'new user was added successfully!',
    data: {
      user: newUser,
    },
    accessToken,
  });
});

export const findMe = asyncMiddleWare(async (req: Request, res: Response) => {
  if (!req.user) throw new AppError('Unauthorized', 401);

  const user = await findUserByIdInDb(req.user.id);
  if (!user) throw new AppError('User not found', 404);

  res.status(200).json({
    data: {
      user: toSafeUser(user),
    },
  });
});
