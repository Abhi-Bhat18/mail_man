import { Controller, Get, Res , Req, Post, Body, UseGuards } from '@nestjs/common';
import { EmailService } from './email.service';
import { EmailDto } from './dto/email.dto';
import { Response , Request} from 'express';
import { AuthGuard } from '../auth/auth.guard';

@Controller('email')
@UseGuards(AuthGuard)
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Get()
  emailCheck() {
    // const mailInfo = await this.emailService.sendEmail();
    return 'Email Check';
  }

  @Post()
  async sendEmail (@Body() body : EmailDto,  @Req() req : Request, @Res() res : Response  ) { 

    const { to,subject , content , html } = body;


    const info = await this.emailService.sendEmail(to, subject, content, html)

    res.json({ info : info})

  }
}
