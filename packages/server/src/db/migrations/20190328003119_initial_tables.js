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

  // Tweet table
  await knex.schema.createTable('tweets', table => {
    table
      .uuid('id')
      .notNullable()
      .primary()
      .defaultTo(knex.raw('uuid_generate_v4()'));
    table.text('content');
    table
      .uuid('userId')
      .references('id')
      .inTable('users');
    table.timestamps(true, true);
  });

  // Followers table
  await knex.schema.createTable('follows', table => {
    table
      .uuid('id')
      .notNullable()
      .primary()
      .defaultTo(knex.raw('uuid_generate_v4()'));
    table
      .uuid('userId')
      .references('id')
      .inTable('users');
    table
      .uuid('followingId')
      .references('id')
      .inTable('users');
  });
};

exports.down = async function(knex) {
  await knex.schema.dropTableIfExists('follows');
  await knex.schema.dropTableIfExists('tweets');
  await knex.schema.dropTableIfExists('users');
};
