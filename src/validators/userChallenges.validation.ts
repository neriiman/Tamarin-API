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
  userChallengeId: z.uuid(),
});

export type userChallengeIdParams = z.infer<typeof userChallengeIdSchema>;

export const validateUserChallengeId = validateParams<userChallengeIdParams>(userChallengeIdSchema);

export const completeVideoParamsSchema = z.object({
  userChallengeId: z.uuid(),
  challengeDayVideoId: z.uuid(),
});

export type CompleteVideoParams = z.infer<typeof completeVideoParamsSchema>;

export const validateCompleteVideoParams =
  validateParams<CompleteVideoParams>(completeVideoParamsSchema);

export const completeDayParamsSchema = z.object({
  userChallengeId: z.uuid(),
  dayNumber: z.coerce.number().int().min(1),
});

export type CompleteDayParams = z.infer<typeof completeDayParamsSchema>;

export const validateCompleteDayParams = validateParams<CompleteDayParams>(completeDayParamsSchema);
