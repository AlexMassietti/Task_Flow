import { forwardRef, Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { DashboardService } from '../dashboard/dashboard.service';
import { RolDashboardService } from '../rol-dashboard/rol-dashboard.service';
import { DashboardStatsDto } from './dto/monthly-stats.dto';
import { TaskRepository } from '@microservice-tasks/infra/typeorm/task.repository';


@Injectable()
export class StatisticsService {
  private readonly logger = new Logger(StatisticsService.name);
  constructor(
    @Inject(forwardRef(() => TaskRepository))
    private readonly taskRepository: TaskRepository,
    @Inject(forwardRef(() => DashboardService))
    private dashboardService: DashboardService,
    private readonly rolDashboardService: RolDashboardService,
  ) {}

  async generateAndNotify(month: number, year: number) {
    const dashboards = await this.dashboardService.findAll();

    for (const dashboard of dashboards) {
      try {
        const dto: DashboardStatsDto = {dashboardId: dashboard.id,

        year: year,

        month: month};
        const stats = await this.generateMonthlyStats(dto);

        // Si no hay tareas o el dashboard no existe (null), saltamos
        if (!stats || stats.totalTasks === 0) continue;

        const users = await this.rolDashboardService.findUsersInDashboard(dashboard.id);
        
        // Solo enviamos si hay usuarios y hay estadísticas
        if (users.length > 0) {
          // Lógica de mailClient...
        }
      } catch (error) {
        // Si un dashboard falla (ej. 404), logueamos y seguimos con el siguiente
        this.logger.error(`Error procesando dashboard ${dashboard.id}: ${error.message}`);
        continue; 
      }
    }
  }

  async generateMonthlyStats(dto: DashboardStatsDto) {
    // 1. Desestructuración para limpieza
    const { dashboardId, year, month } = dto;

    // 2. Validación de existencia del dashboard
    const dashboard = await this.dashboardService.findOne(dashboardId);
    if (!dashboard) throw new NotFoundException('Dashboard not found');
    // 3. Cálculo de fechas
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0, 23, 59, 59);

    // 4. Delegación al repositorio personalizado
    const tasks = await this.taskRepository.findTasksStartingBetweenDatesInDashboard(
      startDate,
      endDate,
      dashboardId
    );

    // 5. Procesamiento de estadísticas
    const total = tasks.length;
    if(total === 0){
      return null
    }
    const completed = tasks.filter(t => t.status.name === 'Realizada').length;
    const pending = tasks.filter(t => t.status.name === 'Pendiente').length;
    const inProgress = tasks.filter(t => t.status.name === 'En progreso').length;

    const completionRate = total === 0 ? '0%' : `${Math.round((completed / total) * 100)}%`;

    return {
      dashboardId,
      year,
      month,
      totalTasks: total,
      completedTasks: completed,
      pendingTasks: pending,
      inProgressTasks: inProgress,
      completionRate,
    };
  }
}
