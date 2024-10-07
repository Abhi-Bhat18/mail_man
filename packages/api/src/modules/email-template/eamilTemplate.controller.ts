import {
  Controller,
  Req,
  Body,
  Get,
  Query,
  Post,
  UseGuards,
  Param,
} from '@nestjs/common';
import { query, Request } from 'express';
import { EmailTemplateService } from './emailTemplate.service';
import { emailTemplateDto } from './dto/emailTemplate.dto';
import { generateUlid } from '@/utils/generators';
import { AuthGuard } from '../auth/auth.guard';
import {
  EmailSearchQueryDto,
  EmailTemplateQueryDto,
} from './dto/emailTemplateQuery.dto';

@Controller('email-template')
@UseGuards(AuthGuard)
export class EmailTemplateController {
  constructor(private emailTemplateService: EmailTemplateService) {}

  @Get()
  async getTemplates(@Query() query: EmailTemplateQueryDto) {
    return await this.emailTemplateService.getAllTemplates(query);
  }

  @Get('search')
  async searchByName(@Query() query: EmailSearchQueryDto) {
    const { search } = query;
    return await this.emailTemplateService.searchByName(search);
  }

  @Post()
  async createNewTemplate(@Body() body: emailTemplateDto, @Req() req: Request) {
    return await this.emailTemplateService.insertTemplate({
      id: generateUlid(),
      ...body,
      created_by: req.user.id,
    });
  }

  @Get(':id')
  async getAnEmailTemplate(@Param('id') id: string) {
    return await this.emailTemplateService.getATemplateById(id);
  }
}
