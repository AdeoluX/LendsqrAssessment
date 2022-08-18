// Update with your config settings.
require('dotenv').config();
/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: 'mysql',
    connection: {
      host: process.env.DB_LIVE_HOST,
      user: process.env.DB_LIVE_USER,
      password: process.env.DB_LIVE_PASS,
      database: process.env.DB_LIVE_USER,
      port: process.env.DB_LIVE_PORT,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_user_migrations',
    },
  },
  test: {
    client: 'mysql',
    connection: {
      host: process.env.DB_TEST_HOST,
      user: process.env.DB_TEST_USER,
      password: process.env.DB_TEST_PASS,
      database: process.env.DB_TEST_USER,
      port: process.env.DB_TEST_PORT,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_test_migrations',
    },
  },
};
