import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { MAIL_SERVICE } from '@api-gateway/config/microservice.config';
import { MailController } from './mail.controller';
import { MailGatewayService } from './mail.service';

@Module({
  imports: [ClientsModule.register([MAIL_SERVICE])],
  controllers: [MailController],
  providers: [MailGatewayService],
})
export class MailModule {}
