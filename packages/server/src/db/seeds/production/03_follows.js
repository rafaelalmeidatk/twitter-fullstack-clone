const usersId = require('./01_users').ids;

const createRandomFollows = () => {
  let follows = [];

  Object.keys(usersId).forEach(key1 => {
    const userId = usersId[key1];

    Object.keys(usersId).forEach(key2 => {
      const targetUserId = usersId[key2];

      if (userId !== targetUserId && Math.random() > 0.6) {
        follows.push({
          userId,
          followingId: targetUserId,
        });
      }
    });
  });

  return follows;
};

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('follows')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('follows').insert(createRandomFollows());
    });
};
