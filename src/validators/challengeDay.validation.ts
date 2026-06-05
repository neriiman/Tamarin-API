import z from 'zod';

export const getChallengeDaysSchema = z.object({
  challengeId: z.uuid(),
});
export type GetChallengeDaysParams = z.infer<typeof getChallengeDaysSchema>;

export const getChallengeDayVideosSchema = z.object({
  challengeId: z.uuid(),
  dayNumber: z.coerce.number().int().min(1),
});

export type GetChallengeDayVideosParams = z.infer<typeof getChallengeDayVideosSchema>;
