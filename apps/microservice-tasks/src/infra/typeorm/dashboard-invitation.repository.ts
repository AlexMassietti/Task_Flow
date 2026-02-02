// infra/typeorm/dashboard-invitation.repository.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IDashboardInvitationRepository } from '../../core/ports/dashboard-invitation.interface';
import { DashboardInvitation, InvitationStatus } from '../../dashboard-invitation/entities/dashboard-invitation.entity';

@Injectable()
export class DashboardInvitationRepository implements IDashboardInvitationRepository {
  constructor(
    @InjectRepository(DashboardInvitation)
    private readonly repo: Repository<DashboardInvitation>,
  ) {}

  create(data: Partial<DashboardInvitation>): DashboardInvitation {
    return this.repo.create(data);
  }

  async save(invitation: DashboardInvitation): Promise<DashboardInvitation> {
    return await this.repo.save(invitation);
  }

  async findOne(id: string): Promise<DashboardInvitation | null> {
    return await this.repo.findOne({ 
      where: { id },
      relations: ['dashboard'] 
    });
  }

  async findPendingInvitation(dashboardId: number, email: string): Promise<DashboardInvitation | null> {
    return await this.repo.findOne({
      where: {
        dashboard: { id: dashboardId },
        email: email,
        status: InvitationStatus.PENDING
      }
    });
  }
}