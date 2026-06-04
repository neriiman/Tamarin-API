import z from 'zod';

export const toggleFavouriteParamsSchema = z.object({
  videoId: z.uuid(),
});

export type ToggleFavouriteParams = z.infer<typeof toggleFavouriteParamsSchema>;
