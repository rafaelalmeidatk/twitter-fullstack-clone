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

it('should fetch the feed of the current user', async () => {
  const context = { user };

  const query = `
    query getUserFeed($first: Int!, $after: String) {
      feed(first: $first, after: $after) {
        edges {
          cursor
          node {
            type
            originalTweet {
              id
              content
              retweeted
              liked
              user {
                id
                name
                username
              }
            }
            contextTweet {
              id
            }
            contextUser {
              id
              name
            }
          }
        }
        pageInfo {
          hasNextPage
        }
      }
    }
  `;

  const variables = {
    first: 10,
  };

  const result = await request(query, { context, variables });
  expect(result).toMatchSnapshot();
});
