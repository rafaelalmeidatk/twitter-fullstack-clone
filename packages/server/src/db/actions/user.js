import bcrypt from 'bcryptjs';
import knex from '../knex';
import { POSTGRES_UNIQUE_VIOLATION } from '../constants';
import { UniqueViolation } from '../errors';

export async function hashPassword(password) {
  return new Promise(resolve =>
    bcrypt.hash(password, 8, (err, hash) => resolve(hash))
  );
}

export async function verifyPassword(password, hash) {
  return bcrypt.compare(password, hash);
}

export async function findUserById(id) {
  const users = await knex('users').where({ id });
  return users && users[0];
}

export async function findUserByUsername(username) {
  const users = await knex('users').where({ username });
  return users && users[0];
}

export async function createUser({ name, username, password, email }) {
  try {
    const hashedPassword = await hashPassword(password);
    await knex('users').insert({
      name,
      username,
      password: hashedPassword,
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

export async function getUserTweetsCount(user) {
  const entries = await knex('tweets')
    .count('id')
    .where({ userId: user.id });
  return Number(entries[0].count);
}

export async function getUserFollowersCount(user) {
  const entries = await knex('follows')
    .count('id')
    .where({ followingId: user.id });
  return Number(entries[0].count);
}

export async function getUserFollowingCount(user) {
  const entries = await knex('follows')
    .count('id')
    .where({ userId: user.id });
  return Number(entries[0].count);
}
