import { Module } from '@nestjs/common';
import { ParticipantTypeService } from './participant-type.service';
import { ParticipantTypeController } from './participant-type.controller';
import { DASHBOARD_SERVICE } from '@api-gateway/config/microservice.config';
import { ClientsModule } from '@nestjs/microservices';

@Module({
  imports:[ClientsModule.register([DASHBOARD_SERVICE])],
  controllers: [ParticipantTypeController],
  providers: [ParticipantTypeService],
})
export class ParticipantTypeModule {}
