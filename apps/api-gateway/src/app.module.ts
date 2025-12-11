import { Module } from '@nestjs/common';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigEnvModule } from './modules/config/config.module';
import { AuthorizationModule } from './modules/authorization/authorization.module';

@Module({
  imports: [ AuthModule, DashboardModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
