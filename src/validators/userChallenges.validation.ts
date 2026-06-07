import z from 'zod';
import { validateParams, validateQuery } from '../middleware/validate.middleware.js';

export const getUserChallengesQuerySchema = z.object({
  status: z.enum(['active', 'completed', 'abandoned', 'paused', 'history']).optional(),
});

export type GetUserChallengesQuery = z.infer<typeof getUserChallengesQuerySchema>;

export const validateGetUserChallengesQuery = validateQuery<GetUserChallengesQuery>(
  getUserChallengesQuerySchema,
);

export const userChallengeIdSchema = z.object({
  id: z.uuid(),
});

export type userChallengeIdParams = z.infer<typeof userChallengeIdSchema>;

export const validateUserChallengeId = validateParams<userChallengeIdParams>(userChallengeIdSchema);
