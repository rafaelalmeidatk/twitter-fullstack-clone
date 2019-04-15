import { baseResolver, isAuthenticatedResolver } from '../../baseResolvers';
import { createTweet as dbCreateTweet } from 'db/tweet';
import userDb from 'db/user';

// Tweet
const getUser = baseResolver.createResolver(async root => {
  return await userDb.findUserById(root.userId);
});

// Query
const allTweets = async () => {
  return [];
};

// Mutation
const createTweet = isAuthenticatedResolver.createResolver(
  async (_, { input }, context) => {
    const { content } = input;
    const { user } = context;

    return await dbCreateTweet({ content, userId: user.id });
  }
);

export default {
  Tweet: {
    user: getUser,
  },
  Query: {
    allTweets,
  },
  Mutation: {
    createTweet,
  },
};
