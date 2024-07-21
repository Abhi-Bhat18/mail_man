import { Get, Injectable, OnModuleInit } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { Kysely } from 'kysely';
import { Database } from '../database/database.types';

@Injectable()
export class RoleService implements OnModuleInit {
  private db: Kysely<Database>;

  constructor(private readonly dbService: DatabaseService) {}

  onModuleInit() {
    this.db = this.dbService.getDb();
  }

  async seed() {
    const roles = [
      {
        name: 'owner',
        description: 'Full access and control over the project',
      },
      {
        name: 'admin',
        description: 'Administrative access with high-level permissions',
      },
      { name: 'manager', description: 'Manage projects and teams' },
      { name: 'analyst', description: 'Access to data and analytics' },
    ];

    for (const role of roles) {
      await this.createRoleIfNotExists(role);
    }

    return 'Roles seeded successfully'
  }

  private async createRoleIfNotExists(role: {
    name: string;
    description: string;
  }): Promise<void> {
    const existingRole = await this.db
      .selectFrom('roles')
      .selectAll()
      .where('name', '=', role.name)
      .executeTakeFirst();

    if (!existingRole) {
      await this.db.insertInto('roles').values(role).execute();
      console.log(`Created role: ${role.name}`);
      return;
    }
    console.log(`Role already exists: ${role.name}`);
  }

  getAllRoles = async () => {
    return await this.db.selectFrom('roles').selectAll().execute();
  };
}
