import { baseResolver, isAuthenticatedResolver } from '../../baseResolvers';
import { createTweet, retweet } from 'db/actions/tweet';
import { findUserById } from 'db/actions/user';

// ------------------------------
// Tweet & Retweet

const getUser = baseResolver.createResolver(async root => {
  return await findUserById(root.userId);
});

const getTweet = baseResolver.createResolver(async root => {
  // The tweet is nested inside the retweet
  return root.tweet;
});

// ------------------------------
// Query

const allTweets = async () => {
  return [];
};

// ------------------------------
// Mutation

const createTweetMutation = isAuthenticatedResolver.createResolver(
  async (_, { input }, { user }) => {
    const { content } = input;
    return await createTweet({ content, userId: user.id });
  }
);

const retweetMutation = isAuthenticatedResolver.createResolver(
  async (_, { input }, { user }) => {
    const { tweetId } = input;

    const createdRetweet = await retweet({ userId: user.id, tweetId });
    return { retweet: createdRetweet };
  }
);

// ------------------------------

export default {
  Tweet: {
    user: getUser,
  },
  Retweet: {
    tweet: getTweet,
    user: getUser,
  },
  Query: {
    allTweets,
  },
  Mutation: {
    createTweet: createTweetMutation,
    retweet: retweetMutation,
  },
};
