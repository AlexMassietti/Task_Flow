import { Controller, Post, Body } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { MailService } from './mail.service';
import { PasswordResetDto } from './dto/password-reset.dto';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post('send-password-reset')
  async passwordResetHttp(@Body() data: PasswordResetDto) {
    return this.mailService.sendPasswordReset(data);
  }

  @MessagePattern({ cmd: 'mail-password-reset' })
  async passwordResetMicro(data: PasswordResetDto) {
    return this.mailService.sendPasswordReset(data);
  }
}