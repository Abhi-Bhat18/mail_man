import { Injectable, OnModuleInit } from '@nestjs/common';
import { DatabaseService } from 'src/modules/database/database.service';
import { Kysely } from 'kysely';
import { Database } from '../database/database.types';
import { NewUser } from 'src/schemas/user.schema';

@Injectable()
export class UserService implements OnModuleInit {
  private db: Kysely<Database>;

  constructor(private readonly dbService: DatabaseService) {}

  onModuleInit() {
    this.db = this.dbService.getDb();
  }

  findByEmail = async (email: string) => {
    return await this.db
      .selectFrom('users')
      .where('email', '=', email)
      .selectAll()
      .executeTakeFirst();
  };

  createUser = async (user: NewUser) => {
    return this.db
      .insertInto('users')
      .values(user)
      .returningAll()
      .executeTakeFirst();
  };

  updateRefreshToken = async (id: string, refreshToken: string) => {
    return this.db
      .updateTable('users')
      .set({
        refresh_token: refreshToken,
      })
      .where('id', '=', id)
      .executeTakeFirst();
};

  deleteRefreshToken = async (id: string) => {
    return this.db
      .updateTable('users')
      .set({ refresh_token: null })
      .where('id', '=', id)
      .executeTakeFirst();
  };
}
