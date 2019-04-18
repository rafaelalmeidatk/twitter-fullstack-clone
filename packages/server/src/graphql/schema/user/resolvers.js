import { AlreadyInUseError } from '../../errors';
import { baseResolver, isAuthenticatedResolver } from '../../baseResolvers';
import { createUser, findUserByUsername } from 'db/actions/user';

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
  Query: {
    allUsers,
    me,
  },
  Mutation: {
    registerUser,
  },
};
