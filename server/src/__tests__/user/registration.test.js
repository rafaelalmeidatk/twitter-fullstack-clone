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
    return knex.migrate.rollback().then(() => knex.migrate.latest());
    // .then(() => knex.seed.run());
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
            username: "rafael"
            password: "aaa"
            email: "test@email.com"
            name: "Rafael"
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
            username: "rafael"
            password: "aaa"
            email: "test@email.com"
            name: "Rafael"
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

    const resultTwo = await request(query, {});
    expect(resultTwo).toMatchSnapshot();
  });
});
