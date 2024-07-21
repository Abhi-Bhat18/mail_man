import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { CommandFactory } from 'nest-commander';
import { RoleModule } from './modules/role/role.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet());
  app.use(cookieParser())
  app.useGlobalPipes(new ValidationPipe())
  await app.listen(1335);
}

bootstrap();
