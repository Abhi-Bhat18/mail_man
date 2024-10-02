import { Module } from '@nestjs/common';
import { ContactListController } from './contactList.controller';
import { DatabaseModule } from '../database/database.module';
import { ContactListService } from './contactList.service';
import { ProjectAccessModule } from '../project-access/projectAccess.module';

@Module({
  imports: [DatabaseModule, ProjectAccessModule],
  controllers: [ContactListController],
  providers: [ContactListService],
})
export class ContactListModule {}
