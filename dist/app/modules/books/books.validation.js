"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookZodValidation = void 0;
const zod_1 = require("zod");
const addBookZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({ required_error: 'Title is required' }),
        author: zod_1.z.string({ required_error: 'author is required' }),
        genre: zod_1.z.string({ required_error: 'genre is required' }),
        publicationDate: zod_1.z.string({
            required_error: 'publicationDate is required',
        }),
        reviews: zod_1.z.number().optional(),
        imgUrl: zod_1.z.string().optional(),
    }),
});
const updateBookZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().optional(),
        author: zod_1.z.string().optional(),
        genre: zod_1.z.string().optional(),
        publicationDate: zod_1.z.string().optional(),
        reviews: zod_1.z.number().optional(),
        imgUrl: zod_1.z.string().optional(),
    }),
});
exports.bookZodValidation = {
    addBookZodSchema,
    updateBookZodSchema,
};
