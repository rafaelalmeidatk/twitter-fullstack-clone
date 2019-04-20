import { UserInputError } from 'apollo-server-express';
import { AlreadyInUseError } from '../../errors';
import { baseResolver, isAuthenticatedResolver } from '../../baseResolvers';
import {
  createUser,
  followUser,
  unfollowUser,
  findUserById,
  findUserByUsername,
  getUserTweetsCount,
  getUserFollowersCount,
  getUserFollowingCount,
  followsUser,
} from 'db/actions/user';
import { getTweetsFromUser } from 'db/actions/tweet';

// ------------------------------
// User

const userTweets = baseResolver.createResolver(async root => {
  return await getTweetsFromUser(root.id);
});

const userTweetsCount = baseResolver.createResolver(async root => {
  return await getUserTweetsCount(root);
});

const userFollowersCount = baseResolver.createResolver(async root => {
  return await getUserFollowersCount(root);
});

const userFollowingCount = baseResolver.createResolver(async root => {
  return await getUserFollowingCount(root);
});

const isFollowingUser = baseResolver.createResolver(async (root, args) => {
  const { username } = args;

  return await followsUser(root, username);
});

// ------------------------------
// Query

const allUsers = async () => {
  return [];
};

const getUser = baseResolver.createResolver(async (root, { input }) => {
  const { id, username } = input;

  if ((!id && !username) || (id && username)) {
    throw new UserInputError(
      'You need to provide the ID or the username, but not both'
    );
  }

  if (id) return await findUserById(id);
  if (username) return await findUserByUsername(username);
  return null;
});

const me = isAuthenticatedResolver.createResolver(
  async (root, data, { user }) => {
    return user;
  }
);

// ------------------------------
// Mutation

const registerUser = baseResolver.createResolver(async (_, { input }) => {
  const { name, username, password, email } = input;

  try {
    await createUser({ name, username, password, email });
  } catch (err) {
    if (err.name === 'UniqueViolation') {
      if (err.field === 'username')
        throw new AlreadyInUseError(
          'This username is already in use',
          'username'
        );

      if (err.field === 'email')
        throw new AlreadyInUseError('This email is already in use', 'email');
    }

    throw err;
  }

  return await findUserByUsername(username);
});

const followUserMutation = isAuthenticatedResolver.createResolver(
  async (root, { input }, { user }) => {
    const { targetId } = input;

    await followUser(user.id, targetId);
    return { user: await findUserById(user.id) };
  }
);

const unfollowUserMutation = isAuthenticatedResolver.createResolver(
  async (root, { input }, { user }) => {
    const { targetId } = input;

    await unfollowUser(user.id, targetId);
    return { user: await findUserById(user.id) };
  }
);

// ------------------------------

export default {
  User: {
    tweets: userTweets,
    tweetsCount: userTweetsCount,
    followersCount: userFollowersCount,
    followingCount: userFollowingCount,
    isFollowingUser,
  },
  Query: {
    allUsers,
    user: getUser,
    me,
  },
  Mutation: {
    registerUser,
    followUser: followUserMutation,
    unfollowUser: unfollowUserMutation,
  },
};
