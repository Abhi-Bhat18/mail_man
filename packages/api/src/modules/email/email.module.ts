import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { EmailController } from './email.controller';
import { DatabaseModule } from '../database/database.module';
import { BullModule } from '@nestjs/bullmq';
import { EmailConsumer } from './email.processor';

@Module({
  imports: [DatabaseModule, BullModule.registerQueue({ name: 'email' })],
  controllers: [EmailController],
  providers: [EmailService, EmailConsumer],
})
export class EmailModule {}
