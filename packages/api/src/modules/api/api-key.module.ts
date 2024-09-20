import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { ApiController } from './api-key.controller';
import { ApiService } from './api-key.services';
import { ProjectService } from '../project/project.service';
import { ProjectModule } from '../project/project.module';
import { ProjectAccessModule } from '../project-access/projectAccess.module';

@Module({
  imports: [DatabaseModule, ProjectModule, ProjectAccessModule],
  controllers: [ApiController],
  providers: [ApiService],
  exports: [ApiService],
})
export class ApiModule {}
