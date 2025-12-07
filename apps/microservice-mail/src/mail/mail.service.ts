import { Inject, Injectable } from '@nestjs/common';
import { NodemailerAdapter } from '../infraestructure/adapters/nodemailer.adapter';
import { passwordResetTemplate } from '../templates/password-reset.template';

@Injectable()
export class MailService {
  constructor(
    @Inject('MAIL_ADAPTER') private readonly mailAdapter: NodemailerAdapter,
  ) {}

  async sendPasswordReset(email: string, code: string) {
    return this.mailAdapter.sendMail({
      to: email,
      subject: 'Recuperación de contraseña',
      html: passwordResetTemplate(code),
    });
  }

  async send(dto: { to: string; subject: string; html: string }) {
    return await this.mailAdapter.sendMail({to : dto.to, subject: dto.subject, html:dto.html});
  }
}
