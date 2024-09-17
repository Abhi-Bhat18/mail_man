import {
  Controller,
  Get,
  Post,
  Req,
  Res,
  Body,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { DatabaseService } from 'src/modules/database/database.service';
import { AuthServices } from './auth.service';
import { Kysely } from 'kysely';
import { Database } from '../database/database.types';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  private db: Kysely<Database>;

  constructor(
    private readonly dbService: DatabaseService,
    private readonly authService: AuthServices,
    private readonly configService: ConfigService,
  ) {}

  @Post('sign-up')
  async signup(@Body() body: CreateUserDto, @Res() res: Response) {
    const user = await this.authService.signUp(body);

    return res.status(HttpStatus.OK).json({
      message: 'User registered successfully',
      data: user,
    });
  }

  @Post('sign-in')
  async signin(@Body() loginDto: LoginDto, @Res() res: Response) {
    const { user, accessToken } = await this.authService.signIn(loginDto);

    res.cookie('token', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 15 * 60 * 1000, // 15 minutes
    });

    return res.json({ message: 'LogIn successfull', user });
  }

  @Get('check')
  @UseGuards(AuthGuard)
  async checkLogin(@Req() req: Request) {
    return await this.authService.checkLogin(req.user.email);
  }

  @Get('sign-out')
  @UseGuards(AuthGuard)
  async signout(@Req() req: Request, @Res() res: Response) {
    await this.authService.signOut(req.user.id);

    res.clearCookie('token');

    return res
      .status(HttpStatus.OK)
      .send({ message: 'Logged out successfully' });
  }
}
