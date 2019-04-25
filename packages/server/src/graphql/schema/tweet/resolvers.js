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
// Context Tweet

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

    return {
      context: {
        type: 'RETWEET',
        ...createdRetweet,
      },
    };
  }
);

const likeMutation = isAuthenticatedResolver.createResolver(
  async (_, { input }, { user }) => {
    const { tweetId } = input;

    const createdLike = await toggleLike({ userId: user.id, tweetId });
    return {
      context: {
        type: 'LIKE',
        ...createdLike,
      },
    };
  }
);

// ------------------------------

export default {
  Tweet: {
    user: getUser,
    retweeted: getRetweeted,
    liked: getLiked,
  },
  ContextTweet: {
    originalTweet: getOriginalTweet,
    contextTweet: getContextTweet,
    contextUser: getContextUser,
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
