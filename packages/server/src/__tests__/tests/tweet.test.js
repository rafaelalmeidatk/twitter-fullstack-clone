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

it('should fetch a tweet', async () => {
  const query = `
    query GetTweet($tweetId: ID!) {
      tweet(id: $tweetId) {
        id
        content
        retweetCount
        likeCount
        retweeted
        liked
        user {
          id
          name
          username
        }
      }
    }
  `;

  const variables = { tweetId: '53c1c783-bebf-4f62-bd46-766c827e7d62' };

  const result = await request(query, { variables });
  expect(result).toMatchSnapshot();
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

it('should reply a tweet', async () => {
  const context = { user };

  const query = `
    mutation ReplyTweet($input: ReplyTweetInput!) {
      replyTweet(input: $input) {
        repliedTweet {
          id
          content
          replyCount
          user {
            id
            username
          }
          replies {
            id
            content
            user {
              id
              username
            }
          }
        }
        replyTweet {
          id
          content
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
      content: 'Replying to the tweet from User Two',
    },
  };

  const result = await request(query, { context, variables });
  expect(result).toMatchSnapshot();
});
