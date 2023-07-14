import { z } from 'zod';

const signUpUserZodValidation = z.object({
  body: z.object({
    fullName: z.string().optional(),
    email: z.string({ required_error: 'Email is required' }),
    password: z.string({ required_error: 'Password is required' }),
  }),
});

export const UserValidation = {
  signUpUserZodValidation,
};
