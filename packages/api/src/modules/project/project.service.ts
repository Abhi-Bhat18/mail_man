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

  createProject = async (body: CreateProjectDto) => {
    const { description, name } = body;
    // create the project for the user
    const project = await this.db
      .insertInto('projects')
      .values({
        id: generateUlid(),
        name,
        description,
      })
      .returningAll()
      .execute();

    return project;
  };

  getProjectById = async (id: string) => {
    
  };

  getCreatedProjects = (offset: Number = 0, limit: Number = 10) => {
    console.log('Offset', offset);
    console.log('Limit', limit);
    return 'Hitting the projects routes';
  };
}
