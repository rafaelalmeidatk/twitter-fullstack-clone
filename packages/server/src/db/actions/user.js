import bcrypt from 'bcryptjs';
import knex from '../knex';
import { POSTGRES_UNIQUE_VIOLATION } from '../constants';
import { UniqueViolation, InvalidOperation } from '../errors';

export async function hashPassword(password) {
  return new Promise(resolve =>
    bcrypt.hash(password, 8, (err, hash) => resolve(hash))
  );
}

export async function verifyPassword(password, hash) {
  return bcrypt.compare(password, hash);
}

export async function findUserById(id, columns = ['*']) {
  const users = await knex('users')
    .select(columns)
    .where({ id });
  return users && users[0];
}

export async function findUserByUsername(username, columns = ['*']) {
  const users = await knex('users')
    .select(columns)
    .where({ username });
  return users && users[0];
}

// ------------------------------
// Creation

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

// ------------------------------
// Interation

export async function followUser(userId, targetId) {
  if (userId === targetId)
    throw new InvalidOperation('You cannot follow yourself');

  return await knex('follows')
    .insert({ userId, followingId: targetId })
    .returning('id');
}

export async function unfollowUser(userId, targetId) {
  return await knex('follows')
    .del()
    .where({ userId, followingId: targetId });
}

// ------------------------------
// Data gathering

export async function followsUser(user, targetUsername) {
  const target = await findUserByUsername(targetUsername, 'id');

  const entries = await knex('follows')
    .select('id')
    .where({
      userId: user.id,
      followingId: target.id,
    });

  return entries.length > 0;
}

export async function getUserFollowingIds(user) {
  const rows = await knex('follows')
    .select('followingId')
    .where({ userId: user.id });
  return rows.map(row => row.followingId);
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

export async function getWhoToFollow(user, count, columns = ['*']) {
  // Selects "count" random users that the user doesn't follow yet
  const rows = await knex('users')
    .select(columns)
    .select(knex.raw('random() as ordering'))
    .whereNotIn('id', function() {
      this.select('follows.followingId')
        .from('follows')
        .where('follows.userId', user.id);
    })
    .whereNot('id', user.id)
    .orderBy('ordering')
    .limit(count);
  return rows;
}
