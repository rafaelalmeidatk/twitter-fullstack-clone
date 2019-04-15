import knex from './knex';

export async function findTweetById(id) {
  const tweets = await knex('tweets').where({ id });
  return tweets && tweets[0];
}

export async function createTweet({ userId, content }) {
  console.log('us', userId);
  const data = await knex('tweets')
    .insert({
      content,
      userId,
    })
    .returning('*');
  return data[0];
}
