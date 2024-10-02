import { Injectable, OnModuleInit } from '@nestjs/common';
import { DatabaseService } from 'src/modules/database/database.service';
import { Kysely } from 'kysely';
import { Database } from '../database/database.types';
import { NewUser, UserUpdate } from 'src/schemas/user.schema';

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

  findByIdAndUpdate = async (id: string, values: UserUpdate) => {
    return await this.db
      .updateTable('users')
      .where('id', '=', id)
      .set(values)
      .returning(['email', 'first_name', 'last_name', 'users.id', 'contact'])
      .executeTakeFirst();
  };

  findByEmail = async (email: string) => {
    return await this.db
      .selectFrom('users')
      .where('email', '=', email)
      .select(['email', 'first_name', 'last_name', 'id', 'password'])
      .executeTakeFirst();
  };

  findByIdAndJoinRole = async (id: string) => {
    return await this.db
      .selectFrom('users')
      .where('users.id', '=', id)
      .innerJoin('roles', 'roles.id', 'users.role_id')
      .select([
        'email',
        'first_name',
        'last_name',
        'users.id',
        'password',
        'contact',
        'roles.name as role',
      ])
      .executeTakeFirst();
  };

  createUser = async (user: NewUser) => {
    return await this.db
      .insertInto('users')
      .values(user)
      .returningAll()
      .executeTakeFirst();
  };

  getAllUsers = async () => {
    return await this.db.selectFrom('users').selectAll().execute();
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
}
