const bcrypt = require('bcryptjs');

const hashPassword = password =>
  new Promise(resolve =>
    bcrypt.hash(password, 8, (err, hash) => resolve(hash))
  );

const ids = {
  steve: '89ba0914-9e9f-4533-9c8e-041204377b72',
  rafaelalmeidatk: 'c867f663-b071-462c-b435-065870a964f6',
  mahek: 'a3a0f0cf-3bb0-4d17-947e-8fc803406315',
  cassie: '478bfd2e-130e-4719-84c2-42f70b7a979d',
  flynn: '3cdb3773-fd37-4628-b00b-566c78022e16',
  alexie: '605254ea-d31d-4c96-b9ff-3948efa4d760',
  saim: '1cabad45-e256-4e3a-bfa0-eeb51a4de577',
  mariyah: 'e2f3291c-5fab-4c73-873f-955d6264ccd3',
  stevie: '4b97df50-d0bc-4585-8667-800c073734cd',
};

exports.ids = ids;

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users')
    .del()
    .then(async function() {
      // Inserts seed entries
      await knex('users').insert([
        {
          id: ids.steve,
          username: 'steve',
          password: await hashPassword('steve'),
          name: 'Steve',
          email: 'steve@email.com',
        },
        {
          id: ids.rafaelalmeidatk,
          username: 'rafaelalmeidatk',
          password: await hashPassword('rafael'),
          name: 'Rafael Almeida',
          email: 'rafael@email.com',
        },
        {
          id: ids.mahek,
          username: 'mahek',
          password: await hashPassword('pass'),
          name: 'Mahek',
          email: 'mahek@email.com',
        },
        {
          id: ids.cassie,
          username: 'cassie',
          password: await hashPassword('pass'),
          name: 'Cassie Hunter',
          email: 'cassie@email.com',
        },
        {
          id: ids.flynn,
          username: 'flynn',
          password: await hashPassword('pass'),
          name: 'Fynn Williams',
          email: 'flynn@email.com',
        },
        {
          id: ids.alexie,
          username: 'alexie',
          password: await hashPassword('pass'),
          name: 'Alexie Whitley',
          email: 'alexie@email.com',
        },
        {
          id: ids.saim,
          username: 'saim',
          password: await hashPassword('pass'),
          name: 'Saim Wagner',
          email: 'saim@email.com',
        },
        {
          id: ids.mariyah,
          username: 'mariyah',
          password: await hashPassword('pass'),
          name: 'Mariyah Huber',
          email: 'mariyah@email.com',
        },
        {
          id: ids.stevie,
          username: 'stevie',
          password: await hashPassword('pass'),
          name: 'Stevie Roche',
          email: 'stevie@email.com',
        },
      ]);
    });
};
