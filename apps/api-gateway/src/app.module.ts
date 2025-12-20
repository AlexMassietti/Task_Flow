import { Module } from '@nestjs/common';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { AuthModule } from './modules/auth/auth.module';
import { TaskModule } from './modules/task/task.module';

@Module({
  imports: [AuthModule, DashboardModule, TaskModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
