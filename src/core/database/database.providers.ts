import { databaseConfig } from './database.config';
import { models } from '@Database/models';
import { Sequelize } from 'sequelize-typescript';
import { SEQUELIZE, DEVELOPMENT, TEST, PRODUCTION } from '@/constants';

let sequelize;
(async () => {
  let config;

  switch (process.env.NODE_ENV) {
    case DEVELOPMENT:
      config = databaseConfig.development;
      break;
    case TEST:
      config = databaseConfig.test;
      break;
    case PRODUCTION:
      config = databaseConfig.production;
      break;
    default:
      config = databaseConfig.development;
  }

  config.models = models;

  sequelize = new Sequelize(config);
  await sequelize.authenticate();
})();

export const databaseProviders = [
  {
    provide: SEQUELIZE,
    useFactory: async () => {
      return sequelize;
    },
  },
];
