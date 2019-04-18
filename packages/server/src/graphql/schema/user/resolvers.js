import { AlreadyInUseError } from '../../errors';
import { baseResolver, isAuthenticatedResolver } from '../../baseResolvers';
import { createUser, findUserByUsername } from 'db/actions/user';
import { getTweetsFromUser } from 'db/actions/tweet';

// User
const userTweets = baseResolver.createResolver(async root => {
  return await getTweetsFromUser(root.id);
});

// Query
const allUsers = async () => {
  return [];
};

const me = isAuthenticatedResolver.createResolver(
  async (root, data, { user }) => {
    return user;
  }
);

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

export default {
  User: {
    tweets: userTweets,
  },
  Query: {
    allUsers,
    me,
  },
  Mutation: {
    registerUser,
  },
};
