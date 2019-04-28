const bcrypt = require('bcryptjs');

const hashPassword = password =>
  new Promise(resolve =>
    bcrypt.hash(password, 8, (err, hash) => resolve(hash))
  );

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users')
    .del()
    .then(async function() {
      // Inserts seed entries
      await knex('users').insert([
        {
          username: 'rafaelalmeidatk',
          password: await hashPassword('rafael'),
          name: 'Rafael Almeida',
          email: 'rafael@email.com',
        },
      ]);

      await knex('users').insert([
        {
          username: 'user',
          password: await hashPassword('pass'),
          name: 'User',
          email: 'mahek@email.com',
        },
      ]);

      await knex('users').insert([
        {
          username: 'cassie',
          password: await hashPassword('pass'),
          name: 'Cassie Hunter',
          email: 'cassie@email.com',
        },
      ]);

      await knex('users').insert([
        {
          username: 'flynn',
          password: await hashPassword('pass'),
          name: 'Fynn Williams',
          email: 'flynn@email.com',
        },
      ]);
    });
};
