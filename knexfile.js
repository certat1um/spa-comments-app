const dotenv = require('dotenv');
dotenv.config();

const {
  POSTGRES_HOST,
  POSTGRES_PORT,
  POSTGRES_PASS,
  POSTGRES_USER,
  POSTGRES_DB,
} = process.env;

module.exports = {
  client: 'postgres',
  connection: {
    host: POSTGRES_HOST,
    port: Number(POSTGRES_PORT),
    user: POSTGRES_USER,
    password: POSTGRES_PASS,
    database: POSTGRES_DB,
  },
  migrations: {
    directory: './database/migrations',
    tableName: 'knex_migrations',
  },
  seeds: { directory: './database/seeds' },
};
