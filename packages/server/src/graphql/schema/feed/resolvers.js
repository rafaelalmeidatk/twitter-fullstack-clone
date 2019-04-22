import { baseResolver, isAuthenticatedResolver } from '../../baseResolvers';
import { getFeedForUser } from 'db/actions/feed';

// ------------------------------
// Query

const getFeedQuery = isAuthenticatedResolver.createResolver(
  async (root, args, { user }) => {
    return await getFeedForUser(user);
  }
);

// ------------------------------

export default {
  Query: {
    feed: getFeedQuery,
  },
};
