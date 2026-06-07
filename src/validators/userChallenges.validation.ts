import z from 'zod';

export const getUserChallengesQuerySchema = z.object({
  status: z.enum(['active', 'completed', 'abandoned', 'paused', 'history']).optional(),
});

export type GetUserChallengesQuery = z.infer<typeof getUserChallengesQuerySchema>;

export const userChallengeIdSchema = z.object({
  id: z.uuid(),
});

export type userChallengeIdParams = z.infer<typeof userChallengeIdSchema>;
