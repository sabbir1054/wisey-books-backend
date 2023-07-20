"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handleDuplicateKeyError = (error) => {
    const errors = [];
    if (error.code === 11000) {
        const field = error.message.match(/index: (.+?)_/)[1];
        errors.push({
            path: field,
            message: 'Duplicate key Error',
        });
    }
    const statusCode = 400;
    return {
        statusCode,
        message: 'Duplicate key Error',
        errorMessages: errors,
    };
};
exports.default = handleDuplicateKeyError;
