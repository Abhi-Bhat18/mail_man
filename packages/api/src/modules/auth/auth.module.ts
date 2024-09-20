import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthServices } from './auth.service';
import { DatabaseModule } from 'src/modules/database/database.module';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';
import { ProjectModule } from '../project/project.module';
import { ProjectAccessModule } from '../project-access/projectAccess.module';

@Module({
  imports: [
    DatabaseModule,
    JwtModule.register({
      global: true,
      secret: 'jwt_secret',
      signOptions: { expiresIn: '15min' },
    }),
    UserModule,
    ProjectModule, 
    ProjectAccessModule,
  ],
  controllers: [AuthController],
  providers: [AuthServices],
})
export class AuthModule {}
