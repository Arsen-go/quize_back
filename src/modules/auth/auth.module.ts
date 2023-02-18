import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';

@Module({
  imports: [
    JwtModule.register({
      secret: 'secret', // Replace this with your own secret key
      signOptions: { expiresIn: '60s' },
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: true,
    }),
  ],
  providers: [AuthService, AuthResolver],
})
export class AppModule {}
