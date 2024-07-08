import { ConfigurableModuleBuilder, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthServices } from './auth.service';
import { DatabaseModule } from 'src/modules/database/database.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';

@Module({
  imports: [
    DatabaseModule,
    JwtModule.register({
      global: true,
      secret: 'jwt_secret',
      signOptions: { expiresIn: '15min' },
    })
  ],
  controllers: [AuthController],
  providers: [AuthServices, UserService],
})

export class AuthModule { }
