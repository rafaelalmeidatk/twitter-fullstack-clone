const path = require('path');
const config = require('./src/config');

const migrations = {
  tableName: 'knex_migrations',
  directory: path.normalize(path.join(__dirname, 'src/db/migrations')),
};

const seeds = {
  directory: path.normalize(path.join(__dirname, `src/db/seeds/${config.env}`)),
};

module.exports = {
  [config.env]: {
    client: 'pg',
    connection: config.databaseConnection,
    pool: {
      min: config.databasePool.min,
      max: config.databasePool.max,
    },
    debug: config.databaseDebug,
    migrations,
    seeds,
  },
};
