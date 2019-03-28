const env = process.env.NODE_ENV || 'development';

// Used on development
const base = {
  databaseConnection: {
    host: '127.0.0.1',
    user: 'twitterclone',
    password: 'twitterclone',
    database: 'dev_twitter_clone',
  },
  databasePool: {
    min: 2,
    max: 10,
  },
  databaseDebug: true,
  env,
};

const test = {
  ...base,
  databaseConnection: {
    ...base.databaseConnection,
    database: 'test_twitter_clone',
  },
  databaseDebug: false,
};

const production = {
  ...base,
  databaseConnection: process.env.PROD_DB_URL,
  databaseDebug: false,
};

module.exports = { development: base, test, production }[env];
