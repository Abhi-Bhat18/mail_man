import {
  Controller,
  Get,
  Post,
  Req,
  Res,
  Body,
  HttpStatus,
  UseGuards,
  Param,
  Query,
  HttpException,
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
import { ProjectService } from '../project/project.service';
import { ProjectAccessService } from '../project-access/projectAccess.service';
import { JwtService } from '@nestjs/jwt';

@Controller('auth')
export class AuthController {
  private db: Kysely<Database>;

  constructor(
    private readonly authService: AuthServices,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly projectService: ProjectService,
    private readonly projectAccessService: ProjectAccessService,
  ) {}

  @Post('sign-up')
  async signup(
    @Query('inviteToken') token: string,
    @Body() body: CreateUserDto,
  ) {
    const verifiedToken = await this.jwtService.verify(token, {
      secret: 'jwt_secret',
    });

    const { projectId, roleId, email } = verifiedToken;

    if (email != body.email) {
      throw new HttpException('Invalid email', HttpStatus.BAD_REQUEST);
    }

    // check project is active
    const project = await this.projectService.getProjectById(projectId);

    if (!project || (project && project.status !== 'active')) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    const user = await this.authService.signUp(body);

    // create the project access for the user
    await this.projectAccessService.createProjectAccess({
      roleId: roleId,
      projectId: project.id,
      userId: user.id,
    });

    return;
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
