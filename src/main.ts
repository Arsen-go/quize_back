import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';

import { AppModule } from '@/app.module';
import { Cors } from './config/configure-cors';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { configureHelmet } from './config/configure-helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    abortOnError: false,
    autoFlushLogs: true,
    bodyParser: true,
  });

  // Helmet middleware for security
  app.use(configureHelmet());
  app.useGlobalPipes(new ValidationPipe({ forbidUnknownValues: false }));

  // Use CORS middleware
  app.use(
    cors({
      origin: 'http://localhost:3000',
      credentials: true,
      exposedHeaders: ['Content-Disposition'],
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      preflightContinue: false,
      optionsSuccessStatus: 204, // Include any custom headers required
    }),
  );

  app.use(cookieParser());

  const port = process.env.PORT || 4000;
  await app.listen(port);

  console.log(`Server started at port ${port}`);
}

bootstrap().catch((err) => {
  console.error('Failed to start the server:', err);
});
