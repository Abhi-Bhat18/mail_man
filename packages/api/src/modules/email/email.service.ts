import { Injectable } from '@nestjs/common';
import { Kysely } from 'kysely';
import { Database } from '../database/database.types';
import { DatabaseService } from '../database/database.service';
import * as nodemailer from 'nodemailer';
import { EventPattern } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EmailService {
  private db: Kysely<Database>;
  private transporter: nodemailer.Transporter;

  constructor(
    private readonly dbService: DatabaseService,
    private readonly configService: ConfigService,
  ) {}

  onModuleInit() {
    this.db = this.dbService.getDb();
    this.transporter = nodemailer.createTransport({
      host: this.configService.get('MAIL_HOST'),
      port: this.configService.get('MAIL_PORT'),
      secure: false,
      auth: {
        user: this.configService.get('MAIL_USER'),
        pass: this.configService.get('MAIL_PASS'),
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
  }

  @EventPattern('my_queue')
  async handleMessage(data: any) {
    console.log('Data', data);
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
