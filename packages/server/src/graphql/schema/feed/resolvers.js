import { isAuthenticatedResolver } from '../../baseResolvers';
import { getFeedForUser } from 'db/actions/feed';
import { decodeCursor, buildEdgesForTweetsPagination } from '../../utils';

// ------------------------------
// Query

const getFeedQuery = isAuthenticatedResolver.createResolver(
  async (root, { first, after }, { user }) => {
    const cursorData = after ? decodeCursor(after) : {};

    const { tweets, hasNextPage } = await getFeedForUser(user, {
      first,
      after: cursorData.after,
      order: cursorData.order,
    });

    return {
      edges: buildEdgesForTweetsPagination(tweets, cursorData.order),
      pageInfo: {
        hasNextPage,
      },
    };
  }
);

// ------------------------------

export default {
  Query: {
    feed: getFeedQuery,
  },
};
