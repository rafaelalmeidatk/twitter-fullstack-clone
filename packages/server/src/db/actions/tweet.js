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

// ------------------------------
// Interation

export async function toggleRetweet({ userId, tweetId }) {
  const deleteResult = await knex('retweets')
    .del()
    .where({ userId, tweetId })
    .returning('*');

  if (deleteResult[0]) {
    return deleteResult[0];
  }

  // The retweet didn't exist so we create now
  const rows = await knex('retweets')
    .insert({
      userId,
      tweetId,
    })
    .returning('*');

  return rows[0];
}

export async function toggleLike({ userId, tweetId }) {
  const deleteResult = await knex('likes')
    .del()
    .where({ userId, tweetId })
    .returning('*');

  if (deleteResult[0]) {
    return deleteResult[0];
  }

  // The likes didn't exist so we create now
  const rows = await knex('likes')
    .insert({
      userId,
      tweetId,
    })
    .returning('*');

  return rows[0];
}

// ------------------------------
// Data gathering

export async function getTweetsFromUser(userId) {
  const rows = await knex('tweets')
    .where({ userId })
    .orderBy('created_at', 'desc');
  return rows;
}

export async function getUserHasRetweeted({ userId, tweetId }) {
  const row = await knex('retweets')
    .first('id')
    .where({
      userId,
      tweetId,
    });
  return !!row;
}

export async function getUserHasLiked({ userId, tweetId }) {
  const row = await knex('likes')
    .first('id')
    .where({
      userId,
      tweetId,
    });
  return !!row;
}
