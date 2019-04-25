import { baseResolver, isAuthenticatedResolver } from '../../baseResolvers';
import {
  findTweetById,
  createTweet,
  toggleRetweet,
  toggleLike,
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
  const id = root.retweetForTweetId || root.likeForTweetId;
  return await findTweetById(id);
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

    const createdRetweet = await toggleRetweet({ userId: user.id, tweetId });
    return { retweet: createdRetweet };
  }
);

const likeMutation = isAuthenticatedResolver.createResolver(
  async (_, { input }, { user }) => {
    const { tweetId } = input;

    const createdLike = await toggleLike({ userId: user.id, tweetId });
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
