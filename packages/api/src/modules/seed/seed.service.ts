import { Injectable, OnModuleInit } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import * as bcrypt from 'bcrypt';
import { Kysely } from 'kysely';
import { Database } from '../database/database.types';
import { roles } from './seed.data';
import { generateUlid } from '@/utils/generators';

@Injectable()
export class SeedService implements OnModuleInit {
  private db: Kysely<Database>;
  constructor(private readonly databaseService: DatabaseService) {}

  onModuleInit() {
    this.db = this.databaseService.getDb();
  }

  async seed() {
    await this.seedRoles();
    await this.seedDefaultUser();
  }

  private async seedRoles() {
    for (const role of roles) {
      const existingRole = await this.db
        .selectFrom('roles')
        .select('id')
        .where('name', '=', role.name)
        .executeTakeFirst();

      if (!existingRole) {
        await this.db
          .insertInto('roles')
          .values({ name: role.name, description: role.description })
          .execute();
      }
    }
  }

  private async seedDefaultUser() {
    const defaultUser = {
      username: 'admin',
      email: 'admin@example.com',
      password: '',
    };

    const existingUser = await this.db
      .selectFrom('users')
      .select('id')
      .executeTakeFirst();

    console.log('User', existingUser);

    if (!existingUser) {
      const hashedPassword = await bcrypt.hash('adminpassword', 10);

      await this.db
        .insertInto('users')
        .values({
          id: generateUlid(),
          first_name: 'super',
          last_name: 'admin',
          email: 'admin@example.com',
          password: hashedPassword,
        })
        .returning('id')
        .executeTakeFirstOrThrow();
      console.log('Default user created successfully');
      console.log('Email', 'admin@example.com');
      console.log('Password', 'adminpassword');
    }
  }
}
