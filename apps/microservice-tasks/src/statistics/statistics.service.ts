import { Injectable, Logger, NotFoundException, Inject, forwardRef } from '@nestjs/common';
import { TaskRepository } from '@microservice-tasks/infra/typeorm/task.repository';
import { DashboardService } from '../dashboard/dashboard.service';
import { ConfigService } from '@nestjs/config';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { DashboardStatsResponseDto } from './dto/dashboard-stats-response.dto';
import { DashboardInfoDto } from './dto/dashboard-info.dto';
import { CreateNotificationDto } from './dto/notification.dto';

@Injectable()
export class StatisticsService {
  private readonly logger = new Logger(StatisticsService.name);

  constructor(
    @Inject(forwardRef(() => TaskRepository))
    private readonly taskRepository: TaskRepository,
    private readonly dashboardService: DashboardService,
    @Inject('GATEWAY_CLIENT')
    private readonly gatewayClient: ClientProxy,
    private readonly configService: ConfigService,
  ) {}


  async generateUserMonthlyReport(month: number, year: number) {
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0, 23, 59, 59);
    const users = await firstValueFrom(
      this.gatewayClient.send({ cmd: 'get_all_users' }, {})
    );

    for (const user of users) {
      try {
        const tasks = await this.taskRepository.findTasksStartingBetweenDatesByUser(
          startDate, 
          endDate, 
          user.id 
        );

        if (tasks.length === 0) continue;

        const stats = this.calculateStatsLogic(tasks);

        const mailPayload = { user, stats, month, year };

        const notiPayload: CreateNotificationDto = {
          userId: user.id,
          type: 'MONTHLY_REPORT',
          title: 'Monthly Report Available',
          message: `Your performance report for ${month}/${year} is ready. Completion rate: ${stats.completionRate}.`,
        };

        await Promise.all([
          firstValueFrom(this.gatewayClient.send({ cmd: 'send_user_monthly_stats' }, mailPayload)),
          firstValueFrom(this.gatewayClient.send({ cmd: 'create_notification' }, notiPayload))
        ]).catch(err => this.logger.error(`Error enviando comunicaciones a user ${user.id}: ${err.message}`));

      } catch (error) {
        this.logger.error(`Error procesando reporte para usuario ${user.id}: ${error.message}`);
      }
    }
  }

  /**
   * REPORTE POR DASHBOARD (On Demand para la UI)
   */
  async getDashboardStats(dto: DashboardInfoDto, month: number, year: number) {
    const dashboard = await this.dashboardService.findOne(dto.dashboardId);
    if (!dashboard) throw new NotFoundException('Dashboard not found');

    // Corregido: Usamos las variables que entran por parámetro
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0, 23, 59, 59);

    const tasks = await this.taskRepository.findTasksStartingBetweenDatesInDashboard(
      startDate, endDate, dto.dashboardId
    );

    if (tasks.length === 0) return null;

    const stats = this.calculateStatsLogic(tasks);
    const baseUrl = this.configService.get<string>('FRONTEND_URL');

    return {
      ...stats,
      dashboardName: dashboard.name,
      dashboardLink: `${baseUrl}/dashboard/${dto.dashboardId}`,
      month,
      year
    };
  }

  private calculateStatsLogic(tasks: any[]): DashboardStatsResponseDto  {
    const stats = tasks.reduce((acc, task) => {
      const status = task.status?.name;
      if (status === 'Completed') acc.completed++;
      else if (status === 'Pending') acc.pending++;
      else if (status === 'In Progress') acc.inProgress++;
      else if (status === 'In Review') acc.inReview++;
      else if (status === 'Archived') acc.archived++;
      return acc;
    }, { completed: 0, pending: 0, inProgress: 0, inReview: 0, archived: 0 });

    const total = tasks.length;
    const effectiveTotal = total - stats.archived;
    const completionRate = effectiveTotal > 0 
      ? `${Math.round(((stats.completed - stats.archived) / effectiveTotal) * 100)}%` 
      : '0%';

    return {
      totalTasks: total,
      ...stats,
      completionRate
    };
  }
}