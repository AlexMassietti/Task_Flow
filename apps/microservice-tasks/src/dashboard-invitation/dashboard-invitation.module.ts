import { Module } from '@nestjs/common';
import { DashboardInvitationService } from './dashboard-invitation.service';
import { DashboardInvitationController } from './dashboard-invitation.controller';
import { InfraModule } from '@microservice-tasks/infra/infra.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthorizationModule } from '@microservice-tasks/authorization/authorization.module';

@Module({
  imports: [
    InfraModule, 
    AuthorizationModule,
    ClientsModule.register([
        {
          name: 'GATEWAY_CLIENT',
          transport: Transport.TCP,
          options: {
            host: process.env.GATEWAY_HOST || '0.0.0.0',
            port: parseInt(process.env.GATEWAY_PORT) || 4002,
          },
        },
      ]),],
  controllers: [DashboardInvitationController, ],
  providers: [DashboardInvitationService],
})
export class DashboardInvitationModule {}
