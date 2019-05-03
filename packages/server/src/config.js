const env = process.env.NODE_ENV || 'development';
const { DATABASE_URL } = process.env;

const baseDatabaseConnection = DATABASE_URL || {
  host: '127.0.0.1',
  user: 'twitterclone',
  password: 'twitterclone',
  database: 'dev_twitter_clone',
};

// Used on development
const base = {
  databaseConnection: baseDatabaseConnection,
  databasePool: {
    min: 2,
    max: 10,
  },
  databaseDebug: false,

  port: process.env.PORT || '4100',
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
  databaseConnection: process.env.DATABASE_URL,
  databaseDebug: false,
};

module.exports = { development: base, test, production }[env];
