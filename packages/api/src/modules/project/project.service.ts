import { Injectable, OnModuleInit } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { Kysely } from 'kysely';
import { Database } from '../database/database.types';
import { CreateProjectDto } from './dto/create-project.dto';
import { generateUlid } from 'src/utils/generators';
import { JwtService } from '@nestjs/jwt';
// import { ProjectAccessService } from '../project-access/projectAccess.service';

@Injectable()
export class ProjectService implements OnModuleInit {
  private db: Kysely<Database>;

  constructor(
    private readonly dbService: DatabaseService,
    private readonly jwtService: JwtService,
  ) {}

  onModuleInit() {
    this.db = this.dbService.getDb();
  }

  createProject = async (body: CreateProjectDto, created_by: string) => {
    const { description, name } = body;

    // create the project for the user
    const project = await this.db
      .insertInto('projects')
      .values({
        id: generateUlid(),
        name,
        description,
        created_by,
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

  getProjects = async (userId: string) => {
    const ownedProjects = this.db
      .selectFrom('projects')
      .select([
        'id',
        'name',
        'description',
        'status',
        'created_at',
        'updated_at',
      ])
      .where('created_by', '=', userId)
      .where('status', '!=', 'deleted');

    const accessibleProjects = this.db
      .selectFrom('projects')
      .innerJoin(
        'project_accesses',
        'projects.id',
        'project_accesses.project_id',
      )
      .select([
        'projects.id',
        'projects.name',
        'projects.description',
        'projects.status',
        'projects.created_at',
        'projects.updated_at',
      ])
      .where('project_accesses.user_id', '=', userId)
      .where('projects.status', '!=', 'deleted')
      .where('projects.created_by', '!=', userId);

    return await ownedProjects.union(accessibleProjects).execute();
  };

  getCreatedProjects = async (
    owner_id: string,
    offset: number = 0,
    limit: number = 10,
  ) => {
    return await this.db
      .selectFrom('projects')
      .where('created_by', '=', owner_id)
      .selectAll()
      .limit(limit)
      .offset(offset)
      .execute();
  };

  generateInviteToken = async (
    projectId: string,
    roleId: number,
    email: string,
  ) => {
    const inviteToken = this.jwtService.sign(
      { projectId, roleId, email },
      {
        secret: 'jwt_secret',
        expiresIn: '7d',
      },
    );

    return inviteToken;
  };
}
