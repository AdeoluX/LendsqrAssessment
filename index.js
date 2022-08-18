const knex = require('knex');
const knexfile = require('./knexfile');

let config;
if (process.env.NODE_ENV === 'test') {
  config = knexfile.test;
} else {
  config = knexfile.development;
}

const db = knex(config);

module.exports = {
  db,
  TABLES: {
    USERS: 'users',
    ACCOUNTS: 'accounts',
    TRANSACTIONS: 'transactions',
  },
};
