import knex from '../knex';
import { getUserFollowingIds } from './user';

const buildQuery = ({ idCollection, order, after, first }) => {
  return knex('tweets')
    .select(
      'id',
      'content',
      'userId',
      'retweetForTweetId',
      'likeForTweetId',
      'created_at'
    )
    .whereIn('userId', idCollection)
    .andWhere(function() {
      if (after) {
        this.where('tweets.created_at', '<', after);
      }
    })
    .orderBy('created_at', order)
    .limit(first);
};

export async function getFeedForUser(user, { first, after, order }) {
  // Get all the IDs from the users that the user is following
  const followingIds = await getUserFollowingIds(user);
  const allIds = [user.id, ...followingIds];
  order = order || 'desc'; // The default is to sort from newest to oldest
  first = Math.min(first || 10, 100); // Default to 10 entries, max of 100

  const rows = await buildQuery({
    idCollection: allIds,
    order,
    after,
    first,
  });

  return {
    tweets: rows,
    async hasNextPage() {
      if (rows.length < first) {
        return false;
      }

      // Check if there is one more tweet after the last sent,
      // if so, we still have pages
      const lastRow = rows[rows.length - 1];

      const query = buildQuery({
        idCollection: allIds,
        order,
        after: lastRow.created_at,
        first: 1,
      });

      const afterRows = await query;
      return afterRows && !!afterRows[0];
    },
  };
}
