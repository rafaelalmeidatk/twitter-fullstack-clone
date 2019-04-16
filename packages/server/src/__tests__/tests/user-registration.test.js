import knexCleaner from 'knex-cleaner';
import { request } from '../utils';
import knex from 'db/knex';

describe('registration', () => {
  afterEach(async () => {
    await knexCleaner.clean(knex, {
      ignoreTables: ['knex_migrations', 'knex_migrations_lock'],
    });
    await knex.seed.run();
  });

  it('should register an user', async () => {
    const query = `
      mutation {
        registerUser(
          input: {
            username: "new_user"
            password: "aaa"
            email: "new_user@email.com"
            name: "New User"
          }
        ) {
          username
          email
          name
        }
      }
    `;

    const result = await request(query, {});
    expect(result).toMatchSnapshot();
  });

  it('should not register an user with the same username', async () => {
    const query = `
      mutation {
        registerUser(
          input: {
            username: "test_user"
            password: "aaa"
            email: "aaaaaa@email.com"
            name: "Test User"
          }
        ) {
          username
          email
          name
        }
      }
    `;

    const result = await request(query, {});
    expect(result).toMatchSnapshot();
  });

  it('should not register an user with the same email', async () => {
    const query = `
      mutation {
        registerUser(
          input: {
            username: "test2"
            password: "aaa"
            email: "test@email.com"
            name: "Test User"
          }
        ) {
          username
          email
          name
        }
      }
    `;

    const result = await request(query, {});
    expect(result).toMatchSnapshot();
  });
});
