import type { NextFunction, Request, Response } from 'express';
import logger from '../config/logger.js';
import { flattenError, ZodError } from 'zod';
import { AppError } from '../errors/AppError.js';
import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';

export const errorMiddleware = (err: unknown, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof ZodError) {
    const errors = flattenError(err);
    logger.warn({
      type: 'VALIDATION_ERROR',
      errors,
    });
    return res.status(400).json({
      message: 'Validation errors',
      errors,
    });
  }

  if (err instanceof TokenExpiredError) {
    logger.error(err);
    return res.status(401).json({
      message: 'token expired',
    });
  }

  if (err instanceof JsonWebTokenError) {
    logger.error(err);
    return res.status(401).json({
      message: 'Unauthorized',
    });
  }

  if (err instanceof AppError) {
    logger.error(err);

    return res.status(err.statusCode).json({
      message: err.message,
    });
  }

  if (err instanceof Error) {
    logger.error(err);

    return res.status(500).json({ message: 'Internal server error' });
  }

  logger.error('Unkown error');

  return res.status(500).json({
    message: 'Internal server error',
  });
};
