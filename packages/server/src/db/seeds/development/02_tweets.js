const faker = require('faker');
const usersId = require('./01_users').ids;

const createRandomTweets = () => {
  let tweets = [];

  // Normal tweets
  Object.keys(usersId).forEach(key => {
    const userId = usersId[key];
    const n = faker.random.number({ min: 7, max: 15 });

    for (let i = 0; i < n; i++) {
      tweets.push({
        id: faker.random.uuid(),
        userId,
        content: faker.lorem.sentence(faker.random.number({ min: 5, max: 18 })),
        created_at: faker.date.recent(20),
      });
    }
  });

  // Retweets
  tweets.forEach(tweet => {
    if (!tweet.content) return;

    Object.keys(usersId).forEach(key => {
      const userId = usersId[key];

      if (Math.random() > 0.2) return; // 20% chance
      tweets.push({
        id: faker.random.uuid(),
        userId,
        created_at: faker.date.between(tweet.created_at, new Date()),
        retweetForTweetId: tweet.id,
      });
    });
  });

  // Likes
  tweets.forEach(tweet => {
    if (!tweet.content) return;

    Object.keys(usersId).forEach(key => {
      const userId = usersId[key];

      if (Math.random() > 0.5) return; // 50% chance
      tweets.push({
        id: faker.random.uuid(),
        userId,
        created_at: faker.date.between(tweet.created_at, new Date()),
        likeForTweetId: tweet.id,
      });
    });
  });

  return tweets;
};

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('tweets')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('tweets').insert([
        {
          userId: usersId.steve,
          content: 'Hello World',
          created_at: faker.date.recent(20),
        },
        {
          userId: usersId.steve,
          content: 'React is awesome!',
          created_at: faker.date.recent(20),
        },
        ...createRandomTweets(),
      ]);
    });
};
