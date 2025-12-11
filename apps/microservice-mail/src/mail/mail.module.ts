import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MailService } from './mail.service';
import { MailController } from './mail.controller';
import { NodemailerAdapter } from '../infraestructure/adapters/nodemailer.adapter';

@Module({
  imports: [ConfigModule],
  controllers: [MailController],
  providers: [
    MailService,

    // 👇 REGISTRAMOS EL ADAPTER CON EL TOKEN CORRECTO
    {
      provide: 'MAIL_ADAPTER',
      useClass: NodemailerAdapter,
    },
  ],
  exports: [MailService],
})
export class MailModule {}
