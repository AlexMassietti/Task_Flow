import { Module } from '@nestjs/common';
import { TaskModule } from './task/task.module';
import { StatusModule } from './status/status.module';
import { PriorityModule } from './priority/priority.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { SeedModule } from './seed/seed.module';
import { RolDashboardModule } from './rol-dashboard/rol-dashboard.module';
import { ParticipantTypeModule } from './participant-type/participant-type.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    DatabaseModule,
    TaskModule,
    StatusModule,
    PriorityModule,
    DashboardModule,
    SeedModule,
    RolDashboardModule,
    ParticipantTypeModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
