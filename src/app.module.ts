import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';

import { ApolloDriverConfig } from '@nestjs/apollo';
import { CacheInterceptor } from './interceptors/caching.interceptor';
import { ConfigModule } from '@nestjs/config';
import { ConfigModuleOptions } from './config/config-module';
import { DatabaseModule } from './database/database.module';
import { GraphQLModule } from '@nestjs/graphql';
import { GraphQlConfig } from './config/graphql-module';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { LoggingInterceptor } from './interceptors/logging.interceptor';
import { Module } from '@nestjs/common';
import Modules from '@Modules/index';
import { SocketModule } from './gateway/socket/socket.module';

@Module({
  imports: [
    ConfigModule.forRoot(ConfigModuleOptions),
    GraphQLModule.forRootAsync<ApolloDriverConfig>(GraphQlConfig),
    DatabaseModule,
    // SocketModule,
    ...Modules,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: CacheInterceptor,
    // },
  ],
})
export class AppModule {}
