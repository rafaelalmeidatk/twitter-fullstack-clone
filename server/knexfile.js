const path = require('path');
const config = require('./src/config');

const migrations = {
  tableName: 'knex_migrations',
  directory: path.normalize(path.join(__dirname, 'src/db/migrations')),
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
  },
};
