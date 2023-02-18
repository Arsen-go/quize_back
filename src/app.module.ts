import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { HttpExceptionFilter } from '@Filters/http-exception.filter';
import { validate } from '@Validations/env.validation';
import { DatabaseModule } from '@Database/database.module';
import { CommonModule } from '@Common/common.module';
import Modules from '@Modules/index';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      envFilePath: `.${process.env.NODE_ENV || 'development'}.env`,
      validate,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      include: Modules,
      driver: ApolloDriver,
      autoSchemaFile: true,
      path: '/',
      buildSchemaOptions: {
        dateScalarMode: 'timestamp',
        numberScalarMode: 'integer',
        noDuplicatedFields: true,
      },
    }),
    ...Modules,
    CommonModule,
    DatabaseModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
