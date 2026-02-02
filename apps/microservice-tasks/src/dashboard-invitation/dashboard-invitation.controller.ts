import { Controller} from '@nestjs/common';
import { DashboardInvitationService } from './dashboard-invitation.service';

import { MessagePattern } from '@nestjs/microservices/decorators/message-pattern.decorator';
import { DashboardInvitationDto } from '@microservice-tasks/dashboard/dto/dashboard-invitation.dto';
import { Payload } from '@nestjs/microservices/decorators';

@Controller('dashboard-invitation')
export class DashboardInvitationController {
  constructor(private readonly dashboardInvitationService: DashboardInvitationService) {}

  @MessagePattern({ cmd : 'accept_dashboard_invitation'})
    acceptDashboardInvitation(@Payload() data: { invitationId: string, userId: number }) {
      return this.dashboardInvitationService.acceptInvitation(data.invitationId, data.userId);
    }

  @MessagePattern({ cmd: 'dashboard_invite' })
  handleDashboardInvite(@Payload() data: DashboardInvitationDto) {
    return this.dashboardInvitationService.createInvitation(data);
  }
}
