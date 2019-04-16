exports.up = async function(knex) {
  // UUID extension
  await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
};

exports.down = async function(knex) {
  await knex.raw('DROP EXTENSION IF EXISTS "uuid-ossp"');
};
