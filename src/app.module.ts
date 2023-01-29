import { Module, NestModule } from '@nestjs/common';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from '@Module/user/user.module';

const imports = [
  MongooseModule.forRoot('mongodb://localhost/quiz'),
  UserModule,
];

@Module({
  imports,
  providers: [AppService],
  exports: [AppService],
})
export class AppModule {}
