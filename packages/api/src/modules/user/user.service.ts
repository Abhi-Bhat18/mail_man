import { Injectable, OnModuleInit } from '@nestjs/common';
import { DatabaseService } from 'src/modules/database/database.service';
import { Kysely } from 'kysely';
import { Database } from '../database/database.types';
import { NewUser } from 'src/schemas/user.schema';
import { generateUlid } from 'src/utils/generators';

@Injectable()
export class UserService implements OnModuleInit {
  private db: Kysely<Database>;

  constructor(private readonly dbService: DatabaseService) {}

  onModuleInit() {
    this.db = this.dbService.getDb();
  }

  async seed() {}

  findById = async (id: string) => {
    return await this.db
      .selectFrom('users')
      .where('id', '=', id)
      .selectAll()
      .executeTakeFirst();
  };

  findByEmail = async (email: string) => {
    return await this.db
      .selectFrom('users')
      .where('email', '=', email)
      .selectAll()
      .executeTakeFirst();
  };

  createUser = async (user: NewUser) => {
    return await this.db
      .insertInto('users')
      .values(user)
      .returningAll()
      .executeTakeFirst();
  };

  updateRefreshToken = async (id: string, refreshToken: string) => {
    return await this.db
      .updateTable('users')
      .set({
        refresh_token: refreshToken,
      })
      .where('id', '=', id)
      .executeTakeFirst();
  };

  deleteRefreshToken = async (id: string) => {
    return await this.db
      .updateTable('users')
      .set({ refresh_token: null })
      .where('id', '=', id)
      .executeTakeFirst();
  };

  private async createSuperAdminIfNotExist(role: {
    name: string;
    description: string;
  }): Promise<void> {}
}
