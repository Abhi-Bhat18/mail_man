import {
  Controller,
  Get,
  Post,
  Put,
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
import { ProjectAccessService } from './projectAccess.service';
import { CreateProjectAccessDto } from './dto/create-project-access.dto';
import { UserService } from '../user/user.service';

@Controller('project')
@UseGuards(AuthGuard)
export class ProjectController {
  constructor(
    private readonly projectService: ProjectService,
    private readonly projectAccessService: ProjectAccessService,
    private readonly userService: UserService,
  ) {}

  @Get('')
  async getProjects(@Req() req: Request) {
    return this.projectService.getCreatedProjects(req.user.id);
  }

  @Post('')
  async createAProject(@Body() body: CreateProjectDto, @Req() req: Request) {
    return this.projectService.createProject(body, req.user.id);
  }

  @Put('/:id')
  async updateAProject(@Param() id: string, @Req() req: Request) {
    const project = await this.projectService.getProjectById(id);

    if (!project) throw new HttpException('Not found', HttpStatus.NOT_FOUND);

    // check wether the use has access
    const projectAccess = await this.projectAccessService.getUserProjectAccess(
      project.id,
      req.user.id,
    );

    if (!projectAccess)
      throw new HttpException('Unauthorized access', HttpStatus.UNAUTHORIZED);
  }

  @Get('/:id')
  async getAProject(@Param('id') id: string, @Req() req: Request) {
    const project = await this.projectService.getProjectById(id);

    if (!project) throw new HttpException('Not found', HttpStatus.NOT_FOUND);

    if (project.owner_id === req.user.id) return project;

    // else wether the user has the access for the the project
    const projectAccess = await this.projectAccessService.getUserProjectAccess(
      project.id,
      req.user.id,
    );

    if (!projectAccess)
      throw new HttpException('Unauthorized access', HttpStatus.UNAUTHORIZED);
    return project;
  }

  @Get('/access/:id')
  async getProjectACcess(@Param() id : string) {

  }

  @Post('/access')
  async giveProjectAccess(
    @Body() body: CreateProjectAccessDto,
    @Req() req: Request,
  ) {
    const project = await this.projectService.getProjectById(body.projectId);

    if (!project)
      throw new HttpException('Project Not found', HttpStatus.NOT_FOUND);

    if(project.owner_id === body.projectId) throw new HttpException("Invalid Request", HttpStatus.BAD_REQUEST);

    const user = await this.userService.findById(body.userId);

    if (!user)
      throw new HttpException('User does not exists', HttpStatus.NOT_FOUND);

    // check project access already exists or not
    const projectAccessExists =
      await this.projectAccessService.getUserProjectAccess(
        body.projectId,
        body.userId,
      );

    if (projectAccessExists)
      throw new HttpException(
        'Project Access already exists',
        HttpStatus.CONFLICT,
      );

    return await this.projectAccessService.createProjectAccess(
      body,
      req.user.id,
    );
  }
}
