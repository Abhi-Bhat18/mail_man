import {
  Controller,
  Query,
  UseGuards,
  Post,
  Get,
  Req,
  Body,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { ContactListService } from './contactList.service';
import { AuthGuard } from '../auth/auth.guard';
import { ContactListQueryDto } from './dto/contactListQuery.dto';
import { ProjectAccessService } from '../project-access/projectAccess.service';
import { ContactListDto } from './dto/contactList.dto';
import { generateUlid } from '@/utils/generators';

@Controller('contact-list')
@UseGuards(AuthGuard)
export class ContactListController {
  constructor(
    private contactListService: ContactListService,
    private projectAccessService: ProjectAccessService,
  ) {}

  @Get()
  async getAllContactLists(
    @Query() query: ContactListQueryDto,
    @Req() req: Request,
  ) {
    const { project_id } = query;

    // check whether access exists or not
    const projectAccess = await this.projectAccessService.getUserProjectAccess(
      project_id,
      req.user.id,
    );

    if (!projectAccess)
      throw new UnauthorizedException('Does not have access to the Project');

    const lists = await this.contactListService.getContactLists(query);
    return lists;
  }

  @Post()
  async createContactList(@Body() body: ContactListDto, @Req() req: Request) {
    const { project_id } = body;

    const projectAccess = await this.projectAccessService.getUserProjectAccess(
      project_id,
      req.user.id,
    );

    if (!projectAccess || projectAccess.role_id > 3) {
      throw new UnauthorizedException('Does not have enough access');
    }

    const newList = await this.contactListService.createContactList({
      id: generateUlid(),
      ...body,
      status: 'active',
      created_by: req.user.id,
    });

    return newList;
  }
}
