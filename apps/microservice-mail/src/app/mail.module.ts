import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailController } from './mail.controller';
import { NodemailerAdapter } from '../infraestructure/adapters/nodemailer.adapter';

@Module({
  controllers: [MailController],
  providers: [
    MailService,
    {
      provide: 'MAIL_ADAPTER',
      useClass: NodemailerAdapter,
    }
  ],
})
export class MailModule {}
