import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { SeedRolesCommand } from './role.command';
import { RoleController } from './role.controller';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [RoleController],
  providers: [RoleService, SeedRolesCommand],
})
export class RoleModule {}
