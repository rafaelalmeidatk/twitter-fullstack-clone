import { UnknownError, AlreadyInUseError } from '../../errors';
import { baseResolver } from '../../baseResolvers';
import userDb from 'db/user';

// Query
const allUsers = async () => {
  return [];
};

// Mutation
const registerUser = baseResolver.createResolver(async (_, { input }) => {
  const { name, username, password, email } = input;

  try {
    await userDb.createUser({ name, username, password, email });
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

  return await userDb.findUserByUsername(username);
});

export default {
  Query: {
    allUsers,
  },
  Mutation: {
    registerUser,
  },
};
