import { isInstance } from 'apollo-errors';
import { createResolver } from 'apollo-resolvers';
import { UnknownError, UnauthorizedError } from './errors';

export const baseResolver = createResolver(null, (root, args, context, err) => {
  if (isInstance(err) || process.env.NODE_ENV !== 'production') {
    return err;
  }

  return new UnknownError({ data: { name: err.name } });
});

export const isAuthenticatedResolver = baseResolver.createResolver(
  (root, args, context) => {
    const { user } = context;
    if (!user) throw new UnauthorizedError();
  }
);
