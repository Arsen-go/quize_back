import * as dotenv from 'dotenv';

import { Sequelize } from 'sequelize-typescript';
import { models } from '@Database/models';

dotenv.config();

let sequelize: Sequelize;
(async () => {
  sequelize = new Sequelize({
    dialect: 'mysql',
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    host: process.env.MYSQL_HOST,
    port: +process.env.MYSQL_PORT,
    logging: false,
    models,
  });

  await sequelize.authenticate();
})();

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: () => sequelize,
  },
];
