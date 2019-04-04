import knex from './knex';
import { POSTGRES_UNIQUE_VIOLATION } from './constants';
import { UniqueViolation } from './errors';

async function findUserByUsername(username) {
  const users = await knex('users').where({ username });
  return users && users[0];
}

async function createUser({ name, username, password, email }) {
  try {
    await knex('users').insert({
      name,
      username,
      password,
      email,
    });
  } catch (err) {
    if (err.code === POSTGRES_UNIQUE_VIOLATION) {
      if (err.constraint.includes('username'))
        throw new UniqueViolation('Username already in use', 'username');

      if (err.constraint.includes('email'))
        throw new UniqueViolation('Email already in use', 'email');
    }

    throw err;
  }
}

export default {
  createUser,
  findUserByUsername,
};
