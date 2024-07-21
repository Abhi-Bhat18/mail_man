import { Injectable, OnModuleInit } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { Kysely } from 'kysely';
import { Database } from '../database/database.types';
import { CreateProjectDto } from './dto/create-project.dto';
import { generateUlid } from 'src/utils/generators';

@Injectable()
export class ProjectService implements OnModuleInit {
  private db: Kysely<Database>;

  constructor(private readonly dbService: DatabaseService) {}

  onModuleInit() {
    this.db = this.dbService.getDb();
  }

  createProject = async (body: CreateProjectDto, owner_id?: string) => {
    const { description, name } = body;

    // create the project for the user
    const project = await this.db
      .insertInto('projects')
      .values({
        id: generateUlid(),
        name,
        description,
        owner_id,
      })
      .returningAll()
      .execute();

    return project;
  };

  getProjectById = async (id: string) => {
    return this.db
      .selectFrom('projects')
      .where('id', '=', id)
      .selectAll()
      .executeTakeFirst();
  };

  getCreatedProjects = async (
    owner_id: string,
    offset: number = 0,
    limit: number = 10,
  ) => {
    return await this.db
      .selectFrom('projects')
      .where('owner_id', '=', owner_id)
      .selectAll()
      .limit(limit)
      .offset(offset)
      .execute();
  };
}
