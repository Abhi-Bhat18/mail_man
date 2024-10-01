// src/database/database.service.ts
import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Kysely, PostgresDialect } from 'kysely';
import { Pool } from 'pg';
import { Database } from './database.types'; // Your database types

@Injectable()
export class DatabaseService implements OnModuleInit, OnModuleDestroy {
  private db: Kysely<Database>;

  onModuleInit() {
    const pool = new Pool({
      host: 'localhost',
      port: 5432,
      database: 'mail_man',
      user: 'abhi',
      password: 'abhi',
    });

    this.db = new Kysely<Database>({
      dialect: new PostgresDialect({ pool }),
    });
  }

  onModuleDestroy() {
    if (this.db) {
      this.db.destroy();
    }
  }

  getDb(): Kysely<Database> {
    return this.db;
  }
}
