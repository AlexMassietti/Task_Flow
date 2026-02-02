import { Test, TestingModule } from '@nestjs/testing';
import { DashboardInvitationService } from './dashboard-invitation.service';

describe('DashboardInvitationService', () => {
  let service: DashboardInvitationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DashboardInvitationService],
    }).compile();

    service = module.get<DashboardInvitationService>(DashboardInvitationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
