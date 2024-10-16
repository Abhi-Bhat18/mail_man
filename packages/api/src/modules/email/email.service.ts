import { Injectable } from '@nestjs/common';
import { Kysely } from 'kysely';
import { Database } from '../database/database.types';
import { DatabaseService } from '../database/database.service';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private db: Kysely<Database>;
  private transporter: nodemailer.Transporter;

  constructor(private readonly dbService: DatabaseService) {}

  onModuleInit() {
    this.db = this.dbService.getDb();
    this.transporter = nodemailer.createTransport({
      host: '212.47.72.43',
      port: 587,
      secure: false,
      auth: {
        user: 'mail@abhishekbhat.com',
        pass: 'Abhishek196927',
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
    mail_from: string,
  ) => {
    const mailOptions = {
      from: mail_from,
      to,
      subject,
      text,
      html,
    };

    const info = await this.transporter.sendMail(mailOptions);
    return info;
  };

  async sendTestEmail() {
    const info = await this.transporter.sendMail({
      from: '"Abhishek Bhat" <mail@abhishekbhat.com>',
      to: 'abhibhat@mailinator.com,abhishekbhat.dev@gmail.com',
      subject: 'SMTP Server Test2',
      html: '<b>Smtp server testing 2</b>',
    });

    return info;
  }

  async deleteEmails() {
    return this.db.deleteFrom('emails').returning('id').execute();
  }
}
