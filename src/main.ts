import { NestFactory } from '@nestjs/core';
import { AppModule } from '@/app.module';
import * as session from 'express-session';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';

const port = 5000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    abortOnError: false,
    bodyParser: true,
    cors: true,
  });

  app.useGlobalPipes(new ValidationPipe({ forbidUnknownValues: false }));

  app.use(
    session({
      secret: 'quiz',
      cookie: {
        secure: process.env['NODE_ENV'] === 'production',
        domain:
          process.env['NODE_ENV'] === 'development'
            ? 'localhost'
            : process.env.FRONTEND_URL,
        httpOnly: true,
      },
      resave: false,
      saveUninitialized: false,
    }),
  );

  app.use(cookieParser());

  await app.listen(port);
}
bootstrap()
  .then(() => console.log('Server started on port ' + port))
  .catch((err) => console.error(err));
