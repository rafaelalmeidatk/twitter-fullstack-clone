import { baseResolver } from '../../baseResolvers';

// Query
const allUsers = async () => {
  console.log('all users!');
  return [];
};

// Mutation
const createUser = baseResolver.createResolver(async (root, { input }) => {
  const { name, username, password, email } = input;

  console.log('create user!', input);

  return null;
});

export default {
  Query: {
    allUsers,
  },
  /*
  Mutation: {
    createUser,
  },
  */
};
