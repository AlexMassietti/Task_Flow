import { Module } from '@nestjs/common';
import { AppController } from './modules/app.controller';
import { AppService } from './modules/app.service';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: join(process.cwd(), 'apps/api-gateway/src/config/env/development.env'),
    }),
    DashboardModule,
    AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
