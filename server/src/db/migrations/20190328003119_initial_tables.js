exports.up = async function(knex) {
  // User table
  await knex.schema.createTable('users', table => {
    table
      .uuid('id')
      .notNullable()
      .primary()
      .defaultTo(knex.raw('uuid_generate_v4()'));
    table.text('username').unique();
    table.text('password').notNullable();
    table.text('email').unique();
    table.text('name').notNullable();
    table.text('bio');
    table.text('avatar_source_url');
    table.text('cover_source_url');
    table.timestamps(true, true);
  });
};

exports.down = async function(knex) {
  await knex.schema.dropTableIfExists('users');
};
