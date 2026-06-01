import z from 'zod';

export const getVideoByIdSchema = z.object({
  id: z.uuid(),
});

export type getVideoByIdParams = z.infer<typeof getVideoByIdSchema>;
