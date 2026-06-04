import z from 'zod';

export const getVideosQuerySchema = z.object({
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(50).default(6),
  type: z.enum(['warmup', 'workout', 'cooldown']).optional(),
  search: z.string().trim().optional(),
  sort: z.enum(['published_date', 'view_count', 'duration']).default('published_date'),
  order: z.enum(['asc', 'desc']).default('desc'),
});

export type GetVideosQuery = z.infer<typeof getVideosQuerySchema> & {
  userId: string | null;
};

export const getVideoByIdSchema = z.object({
  id: z.uuid(),
});

export type getVideoByIdParams = z.infer<typeof getVideoByIdSchema>;
