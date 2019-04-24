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

it('should like a tweet', async () => {
  const context = { user };

  const query = `
    mutation LikeQuery($input: LikeInput!) {
      like(input: $input) {
        like {
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
    input: { tweetId: 'e2a7c8d1-70c4-4e43-b7f0-a9c75d1f92ca' },
  };

  const result = await request(query, { context, variables });
  expect(result).toMatchSnapshot();
});
