import { baseResolver, isAuthenticatedResolver } from '../../baseResolvers';
import {
  findTweetById,
  createTweet,
  replyTweet,
  toggleRetweet,
  toggleLike,
  getReplyCount,
  getRetweetCount,
  getLikeCount,
  getReplies,
  getUserHasRetweeted,
  getUserHasLiked,
} from 'db/actions/tweet';
import { findUserById } from 'db/actions/user';

// ------------------------------
// Tweet

const getUser = baseResolver.createResolver(async root => {
  return await findUserById(root.userId);
});

const replyCount = baseResolver.createResolver(async root => {
  return await getReplyCount(root.id);
});

const retweetCount = baseResolver.createResolver(async root => {
  return await getRetweetCount(root.id);
});

const likeCount = baseResolver.createResolver(async root => {
  return await getLikeCount(root.id);
});

const getTweetReplies = baseResolver.createResolver(async root => {
  return await getReplies(root.id);
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

const getTweet = baseResolver.createResolver(async (_, { id }) => {
  return await findTweetById(id);
});

// ------------------------------
// Mutation

const createTweetMutation = isAuthenticatedResolver.createResolver(
  async (_, { input }, { user }) => {
    const { content } = input;
    return await createTweet({ content, userId: user.id });
  }
);

const replyTweetMutation = isAuthenticatedResolver.createResolver(
  async (_, { input }, { user }) => {
    const { tweetId, content } = input;

    const createdTweet = await replyTweet({
      content,
      tweetId,
      userId: user.id,
    });

    const repliedTweet = await findTweetById(tweetId);

    return { replyTweet: createdTweet, repliedTweet };
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
    replyCount,
    retweetCount,
    likeCount,
    replies: getTweetReplies,
    retweeted: getRetweeted,
    liked: getLiked,
    createdAt: root => root.created_at,
  },
  ContextTweet: {
    originalTweet: getOriginalTweet,
    contextTweet: getContextTweet,
    contextUser: getContextUser,
  },
  Query: {
    allTweets,
    tweet: getTweet,
  },
  Mutation: {
    createTweet: createTweetMutation,
    replyTweet: replyTweetMutation,
    retweet: retweetMutation,
    like: likeMutation,
  },
};
