import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './modules/database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { ProjectModule } from './modules/project/project.module';
import { EmailModule } from './modules/email/email.module';
import { BullModule } from '@nestjs/bullmq';
import { ApiModule } from './modules/api/api-key.module';
import { RoleModule } from './modules/role/role.module';
import { SeederModule } from './modules/seed/seed.module';
import { CommandRunnerModule } from 'nest-commander';
import { ProjectAccessModule } from './modules/project-access/projectAccess.module';
import { ContactListModule } from './modules/contact-list/contactList.module';
import { EmailTemplateModule } from './modules/email-template/emaliTemplate.module';
import { CampaignModule } from './modules/campaign/campaign.module';

@Module({
  // configuringing the env variables
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),

    // configuring the bullmq
    BullModule.forRoot({
      connection: {
        host: 'localhost',
        port: 6379,
      },
    }),
    DatabaseModule,
    SeederModule,
    AuthModule,
    UserModule,
    ProjectModule,
    ProjectAccessModule,
    ContactListModule,
    CampaignModule,
    EmailModule,
    ApiModule,
    RoleModule,
    CommandRunnerModule,
    EmailTemplateModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
// export class AppModule implements NestModule {
//   configure(consumer: MiddlewareConsumer) {
//     consumer.apply(LoggerMiddleware).forRoutes('auth');
//   }
// }
