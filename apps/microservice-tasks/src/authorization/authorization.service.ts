import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { ROL_DASHBOARD_REPO, STATUS_REPO } from '@microservice-tasks/core/ports/tokens';
import { IRolDashboardRepository } from '@microservice-tasks/core/ports/rol-dashboard.interface';
import { IStatusRepository } from '@microservice-tasks/core/ports/status.interface';
import { Dashboard } from '@microservice-tasks/dashboard/entities/dashboard.entity';

@Injectable()
export class AuthorizationService {
  constructor(
    @Inject(ROL_DASHBOARD_REPO)
    private readonly rolDashboardRepository: IRolDashboardRepository,
    @Inject(STATUS_REPO)
    private readonly statusRepository: IStatusRepository,
  ) {}


  private async getUserRoleName(userId: number, dashboardId: number): Promise<string> {

    const rolDashboard = await this.rolDashboardRepository.findUserRole(userId, dashboardId);
    
    if (!rolDashboard) {
      throw new RpcException({ message: 'User is not part of this dashboard', status: HttpStatus.FORBIDDEN });
    }
    return rolDashboard.participantType.name;
  }

  async canManageDashboard(userId: number, dashboardId: number): Promise<void> {
    const role = await this.getUserRoleName(userId, dashboardId);
    if (role !== 'Owner' && role !== 'Admin') {
      throw new RpcException({ message: 'Insufficient permissions (Admin/Owner required)', status: HttpStatus.FORBIDDEN });
    }
  }

  async canManageMembers(userId: number, dashboardId: number): Promise<void> {
    await this.canManageDashboard(userId, dashboardId);
  }

  // --- VALIDACIONES DE TAREAS ---

  async canCreateOrDeleteTask(userId: number, dashboardId: number): Promise<void> {
    const role = await this.getUserRoleName(userId, dashboardId);
    if (['Viewer'].includes(role)) {
      throw new RpcException({ message: 'Viewers cannot create or delete tasks', status: HttpStatus.FORBIDDEN });
    }
    // Owner, Admin y Editor pasan
  }

  async canUpdateTask(
    userId: number, 
    dashboard: Dashboard, 
    newStatusId?: number
  ): Promise<void> {
    const role = await this.getUserRoleName(userId, dashboard.id);

    // 1. Owner y Admin pueden hacer todo
    if (['Owner', 'Admin'].includes(role)) return;

    // 2. Viewer no puede editar nada
    if (role === 'Viewer') {
      throw new RpcException({ message: 'Viewers cannot update tasks', status: HttpStatus.FORBIDDEN });
    }

    // 3. Lógica compleja de EDITOR
    if (role === 'Editor') {
      // Si solo edita texto (no cambia estado), está permitido
      if (!newStatusId) return;

      const targetStatus = await this.statusRepository.findOne(newStatusId);
      if (!targetStatus) throw new RpcException({ message: 'Status not found', status: HttpStatus.NOT_FOUND });

      // Si el dashboard NO requiere review, el editor puede poner Completed
      if (!dashboard.requiresReview) return;

      // Si el dashboard SI requiere review:
      // No puede poner 'Completed', debe poner 'In Review' o cualquier otro.
      if (targetStatus.name === 'Completed') {
        throw new RpcException({ 
          message: 'Editors cannot complete tasks when Review is required. Move to "In Review" instead.', 
          status: HttpStatus.FORBIDDEN 
        });
      }
    }
  }
}