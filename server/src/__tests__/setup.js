import knex from '../db/knex';

module.exports = async () => {
  // Run migrations
  await knex.migrate.rollback();
  await knex.migrate.latest();
  await knex.seed.run();

  // Set reference to knex in order to close the server during teardown
  global.__KNEX__ = knex;
};
