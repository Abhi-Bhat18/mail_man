import { Controller, Get, UseGuards } from '@nestjs/common';
import { EmailService } from './email.service';
import { AuthGuard } from '../auth/auth.guard';

@Controller('email')
@UseGuards(AuthGuard)
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Get()
  async emailCheck() {
    const mailInfo = await this.emailService.sendTestEmail();
    return mailInfo;
  }
}
