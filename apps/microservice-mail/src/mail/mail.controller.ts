import { Controller, Post, Body } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { MailService } from './mail.service';
import { PasswordResetDto } from './dto/password-reset.dto';
import { DashboardInvitationDto} from './dto/dashboard-invitation.dto';

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
  @Post('send-dashboard-invitation')
  async dashboardInviteHttp(@Body()data: DashboardInvitationDto){
    return this.mailService.sendDashboardInvitation(data);
  }
  @MessagePattern({ cmd: 'mail-dashboard-invitation' })
  async dashoboardInviteMicro(data: DashboardInvitationDto) {
    return this.mailService.sendDashboardInvitation(data);
  }
}