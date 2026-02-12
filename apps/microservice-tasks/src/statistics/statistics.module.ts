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
import { ClientsModule, Transport } from '@nestjs/microservices';
import { LeaderboardModule } from '@microservice-tasks/leaderboard/leaderboard.module';


@Module({
  imports: [
    ClientsModule.register([
          {
            name: 'GATEWAY_CLIENT',
            transport: Transport.TCP,
            options: {
              host: process.env.GATEWAY_HOST || '0.0.0.0',
              port: 4002,
            },
          },
        ]),
    forwardRef(()=> TaskModule),
    forwardRef(() => DashboardModule),
    RolDashboardModule,
    LeaderboardModule,
  ],
  providers: [StatisticsService, MonthlyStatisticsCron],
  controllers: [StatisticsController],
  exports: [StatisticsService],
})
export class StatisticsModule {}
