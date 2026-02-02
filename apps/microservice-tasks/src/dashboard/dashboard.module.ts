import { Module } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import { InfraModule } from '@microservice-tasks/infra/infra.module';
import { AuthorizationModule } from '@microservice-tasks/authorization/authorization.module';

@Module({
  imports: [
    InfraModule,
    AuthorizationModule,
  ],
  controllers: [DashboardController],
  providers: [DashboardService],
  exports: [DashboardService],
})
export class DashboardModule { }
