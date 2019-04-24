import knexCleaner from 'knex-cleaner';
import { request } from '../utils';
import knex from 'db/knex';

let user = null;

beforeAll(async () => {
  await knexCleaner.clean(knex, {
    ignoreTables: ['knex_migrations', 'knex_migrations_lock'],
  });
  await knex.seed.run();
  user = (await knex.table('users').where({ username: 'test_user' }))[0];
});

it('should retweet a tweet', async () => {
  const context = { user };

  const query = `
    mutation RetweetQuery($input: RetweetInput!) {
      retweet(input: $input) {
        retweet {
          tweet {
            id
            content
            user {
              id
              username
            }
          }
          user {
            id
            username
          }
        }
      }
    }
  `;

  const variables = {
    input: {
      tweetId: 'e2a7c8d1-70c4-4e43-b7f0-a9c75d1f92ca',
    },
  };

  const result = await request(query, { context, variables });
  expect(result).toMatchSnapshot();
});
