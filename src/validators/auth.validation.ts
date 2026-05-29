import { z } from 'zod';

export const signUpSchema = z.object({
  username: z.string().trim().toLowerCase().min(3).max(30),
  email: z.email().trim().toLowerCase(),
  password: z.string().trim().min(8).max(100),
  firstName: z.string().trim().min(3).max(50).optional(),
  lastName: z.string().trim().min(3).max(50).optional(),
  profileImage: z.url().trim().optional(),
});

export const signInSchema = signUpSchema.pick({ email: true, password: true });

export type SignUpBody = z.infer<typeof signUpSchema>;
export type SignInBody = z.infer<typeof signInSchema>;
