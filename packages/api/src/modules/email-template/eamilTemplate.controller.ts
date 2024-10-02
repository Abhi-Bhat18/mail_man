import {
  Controller,
  Req,
  Body,
  Get,
  Query,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { EmailTemplateService } from './emailTemplate.service';
import { emailTemplateDto } from './dto/emailTemplate.dto';
import { generateUlid } from '@/utils/generators';
import { AuthGuard } from '../auth/auth.guard';
import { EmailTemplateQueryDto } from './dto/emailTemplateQuery.dto';

@Controller('email-template')
@UseGuards(AuthGuard)
export class EmailTemplateController {
  constructor(private emailTemplateService: EmailTemplateService) {}

  @Get()
  async getTemplates(@Query() query: EmailTemplateQueryDto) {
    return await this.emailTemplateService.getAllTemplates(query);
  }

  @Post()
  async createNewTemplate(@Body() body: emailTemplateDto, @Req() req: Request) {
    return await this.emailTemplateService.insertTemplate({
      id: generateUlid(),
      ...body,
      created_by: req.user.id,
    });
  }
}
