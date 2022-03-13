'use strict';
const dotenv = require('dotenv');

dotenv.config();

const { DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_NAME } = process.env;

/** @type {import('typeorm').Connection} */
module.exports = {
  type: 'mysql',
  host: DB_HOST,
  port: DB_PORT,
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_NAME,
  synchronize: false,
  logging: false,
  migrationsTableName: '__migrations',
  entities: ['dist/entities/*.js'],
  migrations: ['dist/migrations/*.js'],
  cli: {
    entitiesDir: 'src/entities',
    migrationsDir: 'src/migrations',
  },
};
