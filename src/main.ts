// main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import helmet from 'helmet';
import * as dotenv from 'dotenv';
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());
  app.use(helmet());

  // Enable CORS
  app.enableCors({
    origin: `http://localhost:${process.env.PORT}`, // specify allowed origins
    credentials: true, // enable credentials (cookies, authorization headers)
  });

  await app.listen(process.env.PORT);
}
bootstrap();
