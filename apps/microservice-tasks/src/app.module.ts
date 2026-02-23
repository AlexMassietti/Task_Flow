import { Module } from '@nestjs/common';
import { TaskModule } from './task/task.module';
import { StatusModule } from './status/status.module';
import { PriorityModule } from './priority/priority.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { RolDashboardModule } from './rol-dashboard/rol-dashboard.module';
import { ParticipantTypeModule } from './participant-type/participant-type.module';
import { DatabaseModule } from './database/database.module';
import { CoreModule } from './core/core.module';
import { InfraModule } from './infra/infra.module';
import { ScheduleModule} from '@nestjs/schedule';
import { StatisticsModule } from './statistics/statistics.module';
import { ConfigModule } from '@nestjs/config';
import { configuration } from '../config/configuration';
import { LeaderboardModule } from './leaderboard/leaderboard.module';
import { FilesModule } from './files/files.module';
import { AuthorizationModule } from './authorization/authorization.module';
import { DashboardInvitationModule } from './dashboard-invitation/dashboard-invitation.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join, resolve } from 'path';
import * as fs from 'fs';

const getStaticPath = () => {
  // Try common locations relative to __dirname
  const pathsToTry = [
    join(__dirname, '..', '..', 'static'), // dist/src/ -> root/static
    join(__dirname, '..', 'static'),      // dist/ -> root/static or src/ -> root/static
    resolve(process.cwd(), 'static')      // Actual project root where you ran the command
  ];

  for (const p of pathsToTry) {
    if (fs.existsSync(p)) return p;
  }
  return pathsToTry[2]; // Fallback to current working directory
};

const staticPath = getStaticPath();

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'static'), 
      serveRoot: '/static',
    }),
    DatabaseModule,
    CoreModule,
    InfraModule,
    TaskModule,
    StatusModule,
    StatisticsModule,
    PriorityModule,
    DashboardModule,
    RolDashboardModule,
    ParticipantTypeModule,
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      envFilePath: '.env',
    }),
    LeaderboardModule,
    FilesModule,
    AuthorizationModule,
    DashboardInvitationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {constructor() {
  } }
