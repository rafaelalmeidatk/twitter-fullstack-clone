import knex from '../knex';

export async function findTweetById(id) {
  const tweets = await knex('tweets').where({ id });
  return tweets && tweets[0];
}

export async function createTweet({ userId, content }) {
  const rows = await knex('tweets')
    .insert({
      content,
      userId,
    })
    .returning('*');
  return rows[0];
}

export async function retweet({ userId, tweetId }) {
  const rows = await knex('retweets')
    .insert({
      userId,
      tweetId,
    })
    .returning('*');
  return rows[0];
}

export async function like({ userId, tweetId }) {
  const rows = await knex('likes')
    .insert({
      userId,
      tweetId,
    })
    .returning('*');
  return rows[0];
}

export async function getTweetsFromUser(userId) {
  const rows = await knex('tweets')
    .where({ userId })
    .orderBy('created_at', 'desc');
  return rows;
}
