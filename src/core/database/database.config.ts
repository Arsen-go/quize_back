import * as dotenv from 'dotenv';
import { IDatabaseConfig } from './interfaces/db-config.interface';

dotenv.config();

export const databaseConfig: IDatabaseConfig = {
  development: {
    dialect: 'mysql',
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    logging: true,
    autoLoadModels: true,
  },
  test: {
    dialect: 'mysql',
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    logging: false,
    autoLoadModels: true,
  },
  production: {
    dialect: 'mysql',
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    logging: false,
    autoLoadModels: true,
  },
};
