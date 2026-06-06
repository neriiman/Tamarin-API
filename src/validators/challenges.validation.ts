import z from 'zod';

export const getChallengesQuerySchema = z.object({
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(50).default(6),
  search: z.string().trim().optional(),
  categoryId: z.uuid().optional(),
  sort: z.enum(['created_at', 'title', 'duration_days']).default('created_at'),
  order: z.enum(['asc', 'desc']).default('desc'),
});

export type GetChallengesQuery = z.infer<typeof getChallengesQuerySchema>;

export const getChallengeByIdSchema = z.object({
  id: z.uuid(),
});

export type getChallengeByIdParams = z.infer<typeof getChallengeByIdSchema>;

export const startChallengeSchema = z.object({
  challengeId: z.uuid(),
});

export type startChallengeParams = z.infer<typeof startChallengeSchema>;
