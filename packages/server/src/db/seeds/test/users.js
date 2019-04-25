const { hashPassword } = require('../../actions/user');

const TEST_USER_ONE_ID = '551cf7db-df68-4ad5-af6c-1935759b9291';
const TEST_USER_TWO_ID = '4173dd82-7c8f-4bfa-9c8e-0158082fe07c';

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users')
    .del()
    .then(async function() {
      // Inserts seed entries
      await knex('users').insert([
        {
          id: TEST_USER_ONE_ID,
          username: 'test_user',
          password: await hashPassword('test'),
          name: 'Test User One',
          email: 'test@email.com',
        },
      ]);

      await knex('users').insert([
        {
          id: TEST_USER_TWO_ID,
          username: 'test_user_two',
          password: await hashPassword('test'),
          name: 'Test User Two',
          email: 'test_two@email.com',
        },
      ]);

      // Tweets
      await knex('tweets').insert([
        {
          id: '53c1c783-bebf-4f62-bd46-766c827e7d62',
          content: 'Hello World from User One!',
          userId: TEST_USER_ONE_ID,
          created_at: '2019-04-23 23:50:01.238712-03',
        },
      ]);

      await knex('tweets').insert([
        {
          id: 'e2a7c8d1-70c4-4e43-b7f0-a9c75d1f92ca',
          content: 'Hello World from User Two!',
          userId: TEST_USER_TWO_ID,
          created_at: '2019-04-23 23:50:02.238712-03',
        },
      ]);

      // Retweets
      await knex('tweets').insert([
        {
          id: 'b73c02bf-d378-4dc6-bfcd-0037d20949f4',
          userId: TEST_USER_ONE_ID,
          created_at: '2019-04-23 23:50:03.238712-03',
          retweetForTweetId: 'e2a7c8d1-70c4-4e43-b7f0-a9c75d1f92ca',
        },
      ]);

      // Likes
      await knex('tweets').insert([
        {
          id: 'cff2eee6-f27c-4991-a4cc-08996393615b',
          userId: TEST_USER_ONE_ID,
          created_at: '2019-04-23 23:50:04.238712-03',
          likeForTweetId: 'e2a7c8d1-70c4-4e43-b7f0-a9c75d1f92ca',
        },
      ]);
    });
};
