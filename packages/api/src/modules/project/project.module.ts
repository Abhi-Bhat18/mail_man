import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { DatabaseModule } from '../database/database.module';
import { UserModule } from '../user/user.module';
import { ProjectAccessModule } from '../project-access/projectAccess.module';

@Module({
  imports: [DatabaseModule, UserModule, ProjectAccessModule],
  controllers: [ProjectController],
  providers: [ProjectService],
  exports: [ProjectService],
})
export class ProjectModule {}
