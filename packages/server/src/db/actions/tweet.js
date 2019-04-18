import knex from '../knex';

export async function findTweetById(id) {
  const tweets = await knex('tweets').where({ id });
  return tweets && tweets[0];
}

export async function createTweet({ userId, content }) {
  const data = await knex('tweets')
    .insert({
      content,
      userId,
    })
    .returning('*');
  return data[0];
}

export async function getTweetsFromUser(userId) {
  const data = await knex('tweets')
    .where({ userId })
    .orderBy('created_at', 'desc');
  return data;
}
