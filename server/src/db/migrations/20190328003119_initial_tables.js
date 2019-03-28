exports.up = async function(knex) {
  // User table
  await knex.schema.createTable('users', table => {
    table
      .uuid('id')
      .notNullable()
      .primary()
      .defaultTo(knex.raw('uuid_generate_v4()'));
    table.string('username').unique();
    table.timestamps(true, true);
  });
};

exports.down = async function(knex) {
  await knex.schema.dropTableIfExists('users');
};
