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

it('should create a tweet', async () => {
  const context = { user };

  const query = `
    mutation CreateTweet($input: CreateTweetInput!) {
      createTweet(input: $input) {
        content
        user {
          id
          username
        }
      }
    }
  `;

  const variables = {
    input: {
      content: 'Hello Wold var',
    },
  };

  const result = await request(query, { context, variables });
  expect(result).toMatchSnapshot();
});
