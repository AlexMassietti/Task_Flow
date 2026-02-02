import { Test, TestingModule } from '@nestjs/testing';
import { DashboardInvitationController } from './dashboard-invitation.controller';
import { DashboardInvitationService } from './dashboard-invitation.service';

describe('DashboardInvitationController', () => {
  let controller: DashboardInvitationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DashboardInvitationController],
      providers: [DashboardInvitationService],
    }).compile();

    controller = module.get<DashboardInvitationController>(DashboardInvitationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
