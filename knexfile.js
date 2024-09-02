const dotenv = require('dotenv');
dotenv.config();

const {
  IS_LOCAL,
  POSTGRES_HOST,
  POSTGRES_PORT,
  POSTGRES_PASSWORD,
  POSTGRES_USER,
  POSTGRES_DB,
  DATABASE_URL,
} = process.env;

module.exports = {
  isLocal: IS_LOCAL,
  local: {
    client: 'pg',
    connection: {
      host: POSTGRES_HOST,
      port: POSTGRES_PORT,
      user: POSTGRES_USER,
      password: POSTGRES_PASSWORD,
      database: POSTGRES_DB,
    },
    migrations: {
      directory: './database/migrations',
      tableName: 'knex_migrations',
    },
    seeds: { directory: './database/seeds' },
  },
  external: {
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
  },
};
