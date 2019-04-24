import { baseResolver, isAuthenticatedResolver } from '../../baseResolvers';
import {
  findTweetById,
  createTweet,
  retweet,
  like,
  getUserHasRetweeted,
  getUserHasLiked,
} from 'db/actions/tweet';
import { findUserById } from 'db/actions/user';

// ------------------------------
// Tweet & Retweet

const getUser = baseResolver.createResolver(async root => {
  return await findUserById(root.userId);
});

const getTweet = baseResolver.createResolver(async root => {
  // If there is already a tweet inside the object, return it
  if (root.tweet) return root.tweet;

  // If we don't have the id of the tweet, return early
  if (!root.tweetId) return null;

  return await findTweetById(root.tweetId);
});

const getRetweeted = baseResolver.createResolver(
  async (root, args, { user }) => {
    if (!user) {
      return false;
    }

    return await getUserHasRetweeted({ userId: user.id, tweetId: root.id });
  }
);

const getLiked = baseResolver.createResolver(async (root, args, { user }) => {
  if (!user) {
    return false;
  }

  return await getUserHasLiked({ userId: user.id, tweetId: root.id });
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

const likeMutation = isAuthenticatedResolver.createResolver(
  async (_, { input }, { user }) => {
    const { tweetId } = input;

    const createdLike = await like({ userId: user.id, tweetId });
    return { like: createdLike };
  }
);

// ------------------------------

export default {
  Tweet: {
    user: getUser,
    retweeted: getRetweeted,
    liked: getLiked,
  },
  Retweet: {
    tweet: getTweet,
    user: getUser,
  },
  Like: {
    tweet: getTweet,
    user: getUser,
  },
  Query: {
    allTweets,
  },
  Mutation: {
    createTweet: createTweetMutation,
    retweet: retweetMutation,
    like: likeMutation,
  },
};
