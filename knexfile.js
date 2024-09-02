const dotenv = require('dotenv');
dotenv.config();

const { DATABASE_URL } = process.env;

module.exports = {
  client: 'pg',
  connection: {
    connectionString: DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  },
  migrations: {
    directory: './database/migrations',
    tableName: 'knex_migrations',
  },
  seeds: { directory: './database/seeds' },
};
