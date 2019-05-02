import { UserInputError } from 'apollo-server-express';
import { AlreadyInUseError } from '../../errors';
import { baseResolver, isAuthenticatedResolver } from '../../baseResolvers';
import { decodeCursor, buildEdgesForTweetsPagination } from '../../utils';
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
  getWhoToFollow,
} from 'db/actions/user';
import { getTweetsFromUser } from 'db/actions/tweet';

// ------------------------------
// User

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

const getProfileTweets = baseResolver.createResolver(
  async (root, { first, after }) => {
    const cursorData = after ? decodeCursor(after) : {};

    const { tweets, hasNextPage } = await getTweetsFromUser(root.id, {
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

const me = baseResolver.createResolver(async (root, data, { user }) => {
  return user;
});

const whoToFollow = isAuthenticatedResolver.createResolver(
  async (root, data, { user }) => {
    return await getWhoToFollow(user, 3);
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
    tweetsCount: userTweetsCount,
    followersCount: userFollowersCount,
    followingCount: userFollowingCount,
    isFollowingUser,
    profileTweets: getProfileTweets,
    whoToFollow,
    avatarSourceUrl: root => root.avatar_source_url,
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
