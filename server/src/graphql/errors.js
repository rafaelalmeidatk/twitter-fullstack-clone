import { createError } from 'apollo-errors';

// Mask any internal errors
export const UnknownError = createError('UnknownError', {
  message: 'An unknown error has occurred',
});

// User should be logged in but isn't
export const UnauthorizedError = createError('UnauthorizedError', {
  message: 'You must login to do that',
});
