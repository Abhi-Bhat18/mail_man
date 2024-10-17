import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { EmailController } from './email.controller';
import { DatabaseModule } from '../database/database.module';

import { EmailConsumer } from './email.processor';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [DatabaseModule, ConfigModule],
  controllers: [EmailController],
  providers: [EmailService, EmailConsumer],
  exports: [EmailService],
})
export class EmailModule {}
