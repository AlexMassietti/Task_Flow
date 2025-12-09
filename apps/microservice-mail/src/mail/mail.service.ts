import { Inject, Injectable } from '@nestjs/common';
import { NodemailerAdapter } from '../infraestructure/adapters/nodemailer.adapter';
import { passwordResetTemplate } from '../templates/password-reset.template';
import { PasswordResetDto } from './dto/password-reset.dto';
import { DashboardInvitationDto} from './dto/dashboard-invitation.dto';
import { dashboardInvitationTemplate} from '../templates/dashboard-invitation.template';
@Injectable()
export class MailService {
  constructor(
    @Inject('MAIL_ADAPTER') private readonly mailAdapter: NodemailerAdapter,
  ) {}

  async sendPasswordReset(data: PasswordResetDto) {
    const html = passwordResetTemplate(data.username, data.resetLink);

    await this.mailAdapter.sendMail({
      to: data.to,
      subject: 'Restore Password',
      html,
    });
    return { succes: true, message:'Password reset email sent'}
  }
  async sendDashboardInvitation(data: DashboardInvitationDto){
    const html = dashboardInvitationTemplate(data.invitedBy, data.dashboardName, data.inviteLink);
    await this.mailAdapter.sendMail({
      to: data.to,
      subject: 'Dashboard Invitation',
      html,
    });
    return { succes: true, message:'Dashboard Invitation email sent'}
  }
}
