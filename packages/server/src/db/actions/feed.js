import knex from '../knex';
import { getUserFollowingIds } from './user';

export async function getFeedForUser(user) {
  const followingIds = await getUserFollowingIds(user);
  const allIds = [user.id, ...followingIds];

  return await knex('tweets')
    .select('*')
    .whereIn('userId', allIds)
    .orderBy('created_at', 'desc');
}
