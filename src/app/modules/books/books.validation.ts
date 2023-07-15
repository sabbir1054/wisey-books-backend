import { z } from 'zod';

const addBookZodSchema = z.object({
  body: z.object({
    title: z.string({ required_error: 'Title is required' }),
    author: z.string({ required_error: 'author is required' }),
    genre: z.string({ required_error: 'genre is required' }),
    publicationDate: z.string({
      required_error: 'publicationDate is required',
    }),

    reviews: z
      .array(
        z.object({
          fullName: z.string(),
          feedback: z.string(),
        })
      )
      .optional(),
    imgUrl: z.string().optional(),
  }),
});
const updateBookZodSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    author: z.string().optional(),
    genre: z.string().optional(),
    publicationDate: z.string().optional(),

    reviews: z
      .array(
        z.object({
          fullName: z.string(),
          feedback: z.string(),
        })
      )
      .optional(),
    imgUrl: z.string().optional(),
  }),
});

const addBookReviewZodSchema = z.object({
  body: z.object({
    fullName: z.string({ required_error: 'Name is required' }),
    feedback: z.string({ required_error: 'Feedback is required' }),
  }),
});

export const bookZodValidation = {
  addBookZodSchema,
  updateBookZodSchema,
  addBookReviewZodSchema,
};
