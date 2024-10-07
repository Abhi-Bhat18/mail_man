import {
  Body,
  Controller,
  Get,
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

@Controller('campaign')
@UseGuards(AuthGuard)
export class CampaignController {
  constructor(private campaignService: CampaignService) {}

  @Get()
  async getAllCampaign(@Query() query: queryDto) {
    const { project_id } = query;
    return await this.campaignService.getAllCampaigns(project_id);
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
}
