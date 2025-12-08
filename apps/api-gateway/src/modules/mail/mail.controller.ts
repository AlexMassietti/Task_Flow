import { Controller, Post, Body } from '@nestjs/common';
import { MailGatewayService } from './mail.service';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailGatewayService) {}

  @Post('password-reset')
  async sendPasswordReset(@Body() body: any) {
    return this.mailService.sendPasswordReset(body);
  }
}
