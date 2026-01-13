import { forwardRef, Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StatisticsService } from './statistics.service';
import { MonthlyStatisticsCron } from './cron/monthly-statistics.cron';
import { Task } from '../task/entities/task.entity';
import { DashboardModule } from '../dashboard/dashboard.module';
import { RolDashboardModule } from '../rol-dashboard/rol-dashboard.module';
import { StatisticsController } from './statistics.controller';
import { TaskModule } from '@microservice-tasks/task/task.module';


@Module({
  imports: [
    forwardRef(()=> TaskModule),
    forwardRef(() => DashboardModule),
    RolDashboardModule,
  ],
  providers: [StatisticsService, MonthlyStatisticsCron],
  controllers: [StatisticsController],
  exports: [StatisticsService],
})
export class StatisticsModule {}
