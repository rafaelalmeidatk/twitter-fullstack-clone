import { isAuthenticatedResolver } from '../../baseResolvers';
import { getFeedForUser } from 'db/actions/feed';

// ------------------------------
// Query

const getFeedQuery = isAuthenticatedResolver.createResolver(
  async (root, { first, after }, { user }) => {
    return await getFeedForUser(user, { first, after });
  }
);

// ------------------------------

export default {
  Query: {
    feed: getFeedQuery,
  },
};
