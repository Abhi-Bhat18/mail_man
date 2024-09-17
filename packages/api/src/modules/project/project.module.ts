import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { DatabaseModule } from '../database/database.module';
import { ProjectAccessService } from './projectAccess.service';
import { UserModule } from '../user/user.module';

@Module({
  imports: [DatabaseModule, UserModule],
  controllers: [ProjectController],
  providers: [ProjectService, ProjectAccessService],
})
export class ProjectModule {}
