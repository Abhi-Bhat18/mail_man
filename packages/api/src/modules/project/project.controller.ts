import {
  Controller,
  Get,
  Post,
  // Put,
  Req,
  Body,
  Param,
  UseGuards,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { AuthGuard } from '../auth/auth.guard';
import { CreateProjectDto } from './dto/create-project.dto';
import { Request } from 'express';
import { ProjectAccessService } from '../project-access/projectAccess.service';
// import { CreateProjectAccessDto } from './dto/create-project-access.dto';
// import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { ProjectInviteDto } from './dto/project-invite.dto';

@Controller('project')
@UseGuards(AuthGuard)
export class ProjectController {
  constructor(
    jwtService: JwtService,
    private readonly projectService: ProjectService,
    private readonly projectAccessService: ProjectAccessService,
  ) {}

  @Get()
  async getProjects(@Req() req: Request) {
    return this.projectService.getProjects(req.user.id);
  }

  @Post('')
  async createAProject(@Body() body: CreateProjectDto, @Req() req: Request) {
    return this.projectService.createProject(body, req.user.id);
  }

  @Get(':id')
  async getAProject(@Param('id') id: string, @Req() req: Request) {
    const project = await this.projectService.getProjectById(id);
    if (!project) throw new HttpException('Not found', HttpStatus.NOT_FOUND);

    if (project.owner_id == req.user.id) return project;

    // check for project access
    const projectAccess = await this.projectAccessService.getUserProjectAccess(
      project.id,
      req.user.id,
    );

    if (!projectAccess)
      throw new HttpException('Unauthorized access', HttpStatus.UNAUTHORIZED);

    return project;
  }

  @Post('invite')
  async inviteUserThroughEmail(
    @Body() body: ProjectInviteDto,
    @Req() req: Request,
  ) {
    const { project_id, role_id, email } = body;

    const project = await this.projectService.getProjectById(project_id);

    if (!project)
      throw new HttpException('Project Not found', HttpStatus.NOT_FOUND);

    let canInvite;
    if (project.owner_id == req.user.id) canInvite = true;

    // look for project access
    if (!canInvite) {
      const projectAccess =
        await this.projectAccessService.getUserProjectAccess(
          project.id,
          req.user.id,
        );

      if (!projectAccess)
        throw new HttpException('Unauthorized access', HttpStatus.NOT_FOUND);
      console.log('Project Access', projectAccess);
    }

    if (!canInvite)
      throw new HttpException('Unauthorized Access', HttpStatus.UNAUTHORIZED);

    // send email through the link

    const invitationToken = await this.projectService.generateInviteToken(
      project.id,
      role_id,
      email,
    );

    return { invitationToken };
  }

  // @Put('/:id')
  // async updateAProject(@Param() id: string, @Req() req: Request) {
  //   const project = await this.projectService.getProjectById(id);

  //   if (!project) throw new HttpException('Not found', HttpStatus.NOT_FOUND);

  //   // check wether the user has access to project
  //   const projectAccess = await this.projectAccessService.getUserProjectAccess(
  //     project.id,
  //     req.user.id,
  //   );

  //   if (!projectAccess)
  //     throw new HttpException('Unauthorized access', HttpStatus.UNAUTHORIZED);

  // }

  // @Get('/access/:id')
  // async getProjectACcess(@Param() id: string) {}

  // @Post('/access')
  // async giveProjectAccess(
  //   @Body() body: CreateProjectAccessDto,
  //   @Req() req: Request,
  // ) {
  //   const project = await this.projectService.getProjectById(body.projectId);

  //   if (!project)
  //     throw new HttpException('Project Not found', HttpStatus.NOT_FOUND);

  //   if (project.owner_id === body.projectId)
  //     throw new HttpException('Invalid Request', HttpStatus.BAD_REQUEST);

  //   const user = await this.userService.findById(body.userId);

  //   if (!user)
  //     throw new HttpException('User does not exists', HttpStatus.NOT_FOUND);

  //   // check project access already exists or not
  //   const projectAccessExists =
  //     await this.projectAccessService.getUserProjectAccess(
  //       body.projectId,
  //       body.userId,
  //     );

  //   if (projectAccessExists)
  //     throw new HttpException(
  //       'Project Access already exists',
  //       HttpStatus.CONFLICT,
  //     );

  //   return await this.projectAccessService.createProjectAccess(body);
  // }
}
