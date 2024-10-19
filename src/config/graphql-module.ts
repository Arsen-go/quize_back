import * as depthLimit from 'graphql-depth-limit';

import { ApolloDriver } from '@nestjs/apollo';
import { GqlModuleAsyncOptions } from '@nestjs/graphql';
import Modules from '@Modules/index';

export const GraphQlConfig: GqlModuleAsyncOptions = {
  driver: ApolloDriver,
  useFactory: () => ({
    autoSchemaFile: true,
    include: Modules,
    path: '/graphql',
    validationRules: [depthLimit(5)],
    buildSchemaOptions: {
      dateScalarMode: 'timestamp',
      numberScalarMode: 'integer',
      noDuplicatedFields: true,
    },
    introspection: true,
    sortSchema: true,
    context: ({ req, res }) => {
      req.requestStartTime = performance.now();

      return { req, res };
    },
  }),
};
