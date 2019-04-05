import { graphql } from 'graphql';
import schema from '../../graphql';
import knex from '../../db/knex';

const request = (query, { context, variables }) => {
  return graphql(
    schema,
    query,
    undefined,
    {
      ...context,
    },
    variables
  );
};

describe('registration', () => {
  beforeEach(() => {
    return knex.migrate
      .rollback()
      .then(() => knex.migrate.latest())
      .then(() => knex.seed.run());
  });

  afterEach(() => {
    return knex.migrate.rollback();
  });

  afterAll(() => {
    return knex.destroy();
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
