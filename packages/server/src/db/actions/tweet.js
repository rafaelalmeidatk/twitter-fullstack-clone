import knex from '../knex';

export async function findTweetById(id) {
  const tweets = await knex('tweets').where({ id });
  return tweets && tweets[0];
}

// ------------------------------
// Creation

export async function createTweet({ userId, content }) {
  const rows = await knex('tweets')
    .insert({
      content,
      userId,
    })
    .returning('*');
  return rows[0];
}

export async function replyTweet({ userId, tweetId, content }) {
  const rows = await knex('tweets')
    .insert({
      content,
      userId,
      replyForTweetId: tweetId,
    })
    .returning('*');
  return rows[0];
}

// ------------------------------
// Interation

export async function toggleRetweet({ userId, tweetId }) {
  const deleteResult = await knex('tweets')
    .del()
    .where({ userId, retweetForTweetId: tweetId })
    .returning('*');

  if (deleteResult[0]) {
    return deleteResult[0];
  }

  // The retweet didn't exist so we create it now
  const rows = await knex('tweets')
    .insert({
      userId,
      retweetForTweetId: tweetId,
    })
    .returning('*');

  return rows[0];
}

export async function toggleLike({ userId, tweetId }) {
  const deleteResult = await knex('tweets')
    .del()
    .where({ userId, likeForTweetId: tweetId })
    .returning('*');

  if (deleteResult[0]) {
    return deleteResult[0];
  }

  // The like didn't exist so we create it now
  const rows = await knex('tweets')
    .insert({
      userId,
      likeForTweetId: tweetId,
    })
    .returning('*');

  return rows[0];
}

// ------------------------------
// Data gathering

export async function getTweetsFromUser(userId, { first, after, order }) {
  order = order || 'desc'; // The default is to sort from newest to oldest
  first = Math.min(first || 10, 100); // Default to 10 entries, max of 100

  const selectQuery = knex('tweets')
    .select(
      'id',
      'content',
      'userId',
      'retweetForTweetId',
      'likeForTweetId',
      'created_at'
    )
    .where({
      userId,
      // We don't show likes and replies in user's profile
      likeForTweetId: null,
      replyForTweetId: null,
    });

  const rows = await selectQuery
    .andWhere(function() {
      if (after) {
        this.where('tweets.created_at', '<', after);
      }
    })
    .orderBy('created_at', order)
    .limit(first);

  return {
    tweets: rows,
    async hasNextPage() {
      if (rows.length < first) {
        return false;
      }

      // Check if there is one more tweet after the last sent,
      // if so, we still have pages
      const lastRow = rows[rows.length - 1];
      const afterRows = await selectQuery
        .andWhere(function() {
          if (lastRow.created_at) {
            this.where('tweets.created_at', '<', lastRow.created_at);
          }
        })
        .orderBy('created_at', order)
        .limit(1);

      return afterRows && !!afterRows[0];
    },
  };
}

export async function getReplyCount(tweetId) {
  const rows = await knex('tweets')
    .count('id')
    .where({ replyForTweetId: tweetId });
  return rows[0].count;
}

export async function getRetweetCount(tweetId) {
  const rows = await knex('tweets')
    .count('id')
    .where({ retweetForTweetId: tweetId });
  return rows[0].count;
}

export async function getLikeCount(tweetId) {
  const rows = await knex('tweets')
    .count('id')
    .where({ likeForTweetId: tweetId });
  return rows[0].count;
}

export async function getReplies(tweetId, columns = ['*']) {
  const rows = await knex('tweets')
    .select(columns)
    .where({ replyForTweetId: tweetId })
    .orderBy('created_at', 'desc');
  return rows;
}

export async function getUserHasRetweeted({ userId, tweetId }) {
  const row = await knex('tweets')
    .first('id')
    .where({
      userId,
      retweetForTweetId: tweetId,
    });
  return !!row;
}

export async function getUserHasLiked({ userId, tweetId }) {
  const row = await knex('tweets')
    .first('id')
    .where({
      userId,
      likeForTweetId: tweetId,
    });
  return !!row;
}
