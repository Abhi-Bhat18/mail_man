import {
  Controller,
  Get,
  Post,
  UseGuards,
  Req,
  Param,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ApiService } from './api.services';
import { AuthGuard } from '../auth/auth.guard';
import { ProjectService } from '../project/project.service';
import { Request } from 'express';

@Controller('api')
@UseGuards(AuthGuard)
export class ApiController {
  constructor(
    private readonly apiService: ApiService,
    private readonly projectService: ProjectService,
  ) {}

  @Get()
  async getProjectApiKey() {}

  @Post('project/:id')
  async generateApiKey(@Param() id: string, @Req() req: Request) {
    // check wether the project exists or user have access to the project
    const project = await this.projectService.getProjectById(id);

    if (!project)
      throw new HttpException(
        'Unable to find the project',
        HttpStatus.NOT_FOUND,
      );

    if (project.owner_id === req.user.id) {
      // generate the api key and send it
    }

    // check wether the use has the project access
    // const projectAccess = await this.proje
  }
}
