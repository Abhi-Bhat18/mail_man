import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { ApiController } from './api.controller';
import { ApiService } from './api.services';
import { ProjectService } from '../project/project.service';

@Module({
  imports: [DatabaseModule],
  controllers: [ApiController],
  providers: [ApiService, ProjectService],
  exports: [ApiService],
})
export class ApiModule {}
