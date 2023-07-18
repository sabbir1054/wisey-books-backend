'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.UserValidation = void 0;
const zod_1 = require('zod');
const signUpUserZodValidation = zod_1.z.object({
  body: zod_1.z.object({
    fullName: zod_1.z.string().optional(),
    email: zod_1.z.string({ required_error: 'Email is required' }),
    password: zod_1.z.string({ required_error: 'Password is required' }),
    wishlist: zod_1.z.array(zod_1.z.string()).optional(),
    readSoon: zod_1.z.array(zod_1.z.string()).optional(),
    finishedBook: zod_1.z.array(zod_1.z.string()).optional(),
  }),
});
exports.UserValidation = {
  signUpUserZodValidation,
};
