import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CampaignService } from './campaign.service';
import { CreateCampaignDto } from './dto/newCampaign.dto';
import { Request } from 'express';
import { generateUlid } from '@/utils/generators';
import { AuthGuard } from '../auth/auth.guard';
import { queryDto } from '@/utils/queryDto';
import { EmailService } from '../email/email.service';

@Controller('campaign')
@UseGuards(AuthGuard)
export class CampaignController {
  constructor(
    private campaignService: CampaignService,
    private emailService: EmailService,
  ) {}

  @Get()
  async getAllCampaign(@Query() query: queryDto) {
    const { project_id } = query;
    return await this.campaignService.getAllCampaigns(project_id);
  }

  @Get(':id')
  async getACampaign(@Param('id') id: string) {
    return await this.campaignService.getACampaign(id);
  }

  @Post()
  async createCampaign(@Body() body: CreateCampaignDto, @Req() req: Request) {
    return await this.campaignService.createCampaign({
      id: generateUlid(),
      ...body,
      created_by: req.user.id,
      scheduled_at: new Date(),
    });
  }

  @Post()
  async sendTestCampaignEmail(
    @Body() body: CreateCampaignDto,
    @Req() req: Request,
  ) {
    const { email } = req.user;
    return await this.campaignService.sendTestCampaignEmail(body, email);
  }

  @Delete('')
  async deleteCampaigns() {
    const emails = await this.emailService.deleteEmails();
    const campaigns = await this.campaignService.deleteCampaigns();
    return { emails, campaigns };
  }
}
