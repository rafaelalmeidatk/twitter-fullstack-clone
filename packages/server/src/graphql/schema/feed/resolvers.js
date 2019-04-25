import { isAuthenticatedResolver, baseResolver } from '../../baseResolvers';
import { getFeedForUser } from 'db/actions/feed';
import { findTweetById } from 'db/actions/tweet';
import { findUserById } from 'db/actions/user';

// ------------------------------
// Query

const getFeedQuery = isAuthenticatedResolver.createResolver(
  async (root, { first, after }, { user }) => {
    return await getFeedForUser(user, { first, after });
  }
);

const getOriginalTweet = baseResolver.createResolver(async root => {
  if (root.type === 'TWEET') {
    return root;
  }

  const id = root.retweetForTweetId || root.likeForTweetId;
  return await findTweetById(id);
});

const getContextTweet = baseResolver.createResolver(async root => {
  if (root.type === 'TWEET') {
    return null;
  }

  // The context tweet is the root object itself
  return root;
});

const getContextUser = baseResolver.createResolver(async root => {
  if (root.type === 'TWEET') {
    return null;
  }

  return await findUserById(root.userId);
});

// ------------------------------

export default {
  FeedNode: {
    originalTweet: getOriginalTweet,
    contextTweet: getContextTweet,
    contextUser: getContextUser,
    type: root => root.type,
  },
  Query: {
    feed: getFeedQuery,
  },
};
