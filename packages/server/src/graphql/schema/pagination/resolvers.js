import { SchemaError } from 'apollo-server-express';
import { baseResolver } from '../../baseResolvers';

// Both functions should be implemented on the return of connection
// resolvers

const hasNextPage = baseResolver.createResolver(root => {
  if (!root.hasNextPage) {
    throw new SchemaError('hasNextPage not implemented for this connection');
  }
  return root.hasNextPage();
});

const hasPreviousPage = baseResolver.createResolver(root => {
  if (!root.hasPreviousPage) {
    throw new SchemaError(
      'hasPreviousPage not implemented for this connection'
    );
  }
  return root.hasPreviousPage();
});

export default {
  PageInfo: {
    hasNextPage,
    hasPreviousPage,
  },
};
