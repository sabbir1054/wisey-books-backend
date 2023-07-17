import { z } from 'zod';

const signUpUserZodValidation = z.object({
  body: z.object({
    fullName: z.string().optional(),
    email: z.string({ required_error: 'Email is required' }),
    password: z.string({ required_error: 'Password is required' }),
    wishlist: z.array(z.string()).optional(),
    readSoon: z.array(z.string()).optional(),
    finishedBook: z.array(z.string()).optional(),
  }),
});

export const UserValidation = {
  signUpUserZodValidation,
};
