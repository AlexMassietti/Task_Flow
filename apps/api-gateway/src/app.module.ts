import { Module } from '@nestjs/common';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [DashboardModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
