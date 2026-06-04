import type { NextFunction, Request, Response } from 'express';
import type { ZodObject } from 'zod';

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
  <T>(schema: ZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.query);

    if (!result.success) {
      return next(result.error);
    }

    req.validatedQuery = result.data as T;
    next();
  };

export const validateParams =
  <T>(schema: ZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.params);

    if (!result.success) {
      return next(result.error);
    }

    req.validatedParams = result.data as T;
    next();
  };
