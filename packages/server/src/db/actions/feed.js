import knex from '../knex';
import { getUserFollowingIds } from './user';

const decodeCursor = cursor => {
  const content = new Buffer(cursor, 'base64').toString('binary');
  const [after, order] = content.split(';');
  return { after: new Date(after), order };
};

const encodeCursor = ({ after, order }) => {
  const input = [new Date(after).toISOString(), order].join(';');
  return Buffer.from(input).toString('base64');
};

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

export async function getFeedForUser(user, { first, after }) {
  // Get all the IDs from the users that the user is following
  const followingIds = await getUserFollowingIds(user);
  const allIds = [user.id, ...followingIds];
  const defaultOrder = 'desc'; // Sort from newest to oldest

  first = Math.min(first || 10, 100); // Default to 10 entries, max of 100
  const cursorData = after ? decodeCursor(after) : {};
  const order = cursorData.order || defaultOrder;

  const query = buildQuery({
    idCollection: allIds,
    order,
    after: cursorData.after,
    first,
  });
  const rows = await query;

  return {
    edges: rows.map(row => {
      const type = row.retweetForTweetId
        ? 'RETWEET'
        : row.likeForTweetId
        ? 'LIKE'
        : 'TWEET';

      const node = { ...row, type };

      return {
        cursor: encodeCursor({ after: row.created_at, order }),
        node,
      };
    }),
    pageInfo: {
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
    },
  };
}
