import { Body, Controller, Post } from '@nestjs/common';
import { MailService } from './mail.service';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post('send-mail')
  async sendMail(
    @Body() body: { to: string; subject: string; html: string }
  ) {
    return this.mailService.send({to: body.to, subject: body.subject,html: body.html});
  }
}
