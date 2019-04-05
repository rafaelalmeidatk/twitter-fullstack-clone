exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('users').insert([
        {
          id: '551cf7db-df68-4ad5-af6c-1935759b9291',
          username: 'test_user',
          password: 'test',
          name: 'Testing',
          email: 'test@email.com',
        },
      ]);
    });
};
