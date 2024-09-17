import { Injectable, OnModuleInit } from '@nestjs/common';
import { Kysely } from 'kysely';
import { Database } from '../database/database.types';
import { DatabaseService } from '../database/database.service';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private db: Kysely<Database>;
  private transporter: nodemailer.Transporter;

  constructor(
    private readonly dbService: DatabaseService,
    @InjectQueue('email') private emailQueue: Queue,
  ) {}

  onModuleInit() {
    this.db = this.dbService.getDb();
    this.transporter = nodemailer.createTransport({
      host: 'localhost',
      port: 587,
      secure: false, // Use STARTTLS
      auth: {
        user: 'abhishekbhat.dev@gmail.com',
        pass: 'password1',
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
  }

  sendEmail = async (
    to: string,
    subject: string,
    text: string,
    html: string,
  ) => {
    const mailOptions = {
      from: 'abhishekbhat.dev@gmail.com',
      to,
      subject,
      text,
      html,
    };

    try {
      const job = await this.emailQueue.add('email', {
        mailOptions,
      });
      return { success: true, message: 'Email queued successfully' };
    } catch (error) {
      console.error('Error sending email:', error);
      throw error;
    }
  };
}
