import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BullModule } from '@nestjs/bullmq'; // Importar BullModule
import { MailService } from './mail.service';
import { MailController } from './mail.controller';
import { MailProcessor } from './processors/mail.processor'; // Importar el Processor
import { NodemailerAdapter } from '../infraestructure/adapters/nodemailer.adapter';

@Module({
  imports: [
    ConfigModule,
    // Registramos la cola específica para este módulo
    BullModule.registerQueue({
      name: 'mail-queue', 
    }),
  ],
  controllers: [MailController],
  providers: [
    MailService,
    MailProcessor, // Agregamos el Processor a los providers
    {
      provide: 'MAIL_ADAPTER',
      useClass: NodemailerAdapter,
    },
  ],
  exports: [MailService, BullModule], // Exportar BullModule a veces es útil si otros módulos inyectan esta cola
})
export class MailModule {}