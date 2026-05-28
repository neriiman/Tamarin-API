import type { Request, Response, NextFunction } from 'express';

type asyncHandler = (
  req: Request,
  res: Response,
  // next: NextFunction
) => Promise<void>;

export const asyncMiddleWare = (handler: asyncHandler) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await handler(req, res);
    } catch (error) {
      next(error);
    }
  };
};
