import { Injectable, OnModuleInit } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { Kysely } from 'kysely';
import { Database } from '../database/database.types';
import { CreateProjectAccessDto } from './dto/create-project-access.dto';
import { generateUlid } from 'src/utils/generators';

@Injectable()
export class ProjectAccessService implements OnModuleInit {
  private db: Kysely<Database>;
  constructor(private readonly dbService: DatabaseService) {}

  onModuleInit() {
    this.db = this.dbService.getDb();
  }

  getUserProjectAccess = async (project_id: string, user_id: string) => {
    return await this.db
      .selectFrom('project_accesses')
      .where('project_id', '=', project_id)
      .where('user_id', '=', user_id)
      .selectAll()
      .executeTakeFirst();
  };

  createProjectAccess = async ( body : CreateProjectAccessDto
  , granted_by : string) => {
    return await this.db.insertInto('project_accesses').values({
      id : generateUlid(),
      project_id : body.projectId,
      role_id : body.roleId,
      user_id : body.userId,
      granted_by : granted_by
    }).returningAll().executeTakeFirst()
  };
}
