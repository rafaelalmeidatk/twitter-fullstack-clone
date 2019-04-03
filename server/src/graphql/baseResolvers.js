import { ApolloError, AuthenticationError } from 'apollo-server-express';
import { createResolver } from 'apollo-resolvers';
import { UnknownError } from './errors';

export const baseResolver = createResolver(null, (root, args, context, err) => {
  if (err instanceof ApolloError || process.env.NODE_ENV !== 'production') {
    return err;
  }

  return new UnknownError();
});

export const isAuthenticatedResolver = baseResolver.createResolver(
  (root, args, context) => {
    const { user } = context;
    if (!user) throw new AuthenticationError();
  }
);
