import { DashboardInvitation } from '../../dashboard-invitation/entities/dashboard-invitation.entity';

export interface IDashboardInvitationRepository {
  create(data: Partial<DashboardInvitation>): DashboardInvitation;
  save(invitation: DashboardInvitation): Promise<DashboardInvitation>;
  findOne(id: string): Promise<DashboardInvitation | null>;
  findPendingInvitation(dashboardId: number, email: string): Promise<DashboardInvitation | null>;
}