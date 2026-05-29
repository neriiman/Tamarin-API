import type { NextFunction, Request, Response } from 'express';
import type { ZodObject } from 'zod';
import type {
  getChallengeByIdParams,
  GetChallengesQuery,
} from '../validators/challenges.validation.js';

export const validateBody =
  (schema: ZodObject) => (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      return next(result.error);
    }

    req.body = result.data;
    next();
  };

export const validateQuery =
  (schema: ZodObject) => (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.query);

    if (!result.success) {
      return next(result.error);
    }

    req.validatedQuery = result.data as GetChallengesQuery;
    next();
  };

export const validateParams =
  (schema: ZodObject) => (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.params);

    if (!result.success) {
      return next(result.error);
    }

    req.validatedParams = result.data as getChallengeByIdParams;
    next();
  };
