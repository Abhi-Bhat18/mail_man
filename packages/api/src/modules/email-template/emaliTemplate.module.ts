import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { ProjectAccessModule } from '../project-access/projectAccess.module';
import { EmailTemplateController } from './eamilTemplate.controller';
import { EmailTemplateService } from './emailTemplate.service';

@Module({
  imports: [DatabaseModule, ProjectAccessModule],
  controllers: [EmailTemplateController],
  providers: [EmailTemplateService],
})
export class EmailTemplateModule {}
