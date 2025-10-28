import { Module } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dashboard } from './entities/dashboard.entity';
import { Task } from 'src/task/entities/task.entity';
import { Status } from 'src/status/entities/status.entity';
import { Priority } from 'src/priority/entities/priority.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Dashboard, Task, Status, Priority])],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}
