import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppNotification } from '../notification/entities/notification.entity';
import { AppNotificationRepository } from './typeorm/notification.repository';
import { NOTIFICATION_REPO } from '../core/ports/tokens';
import { CoreModule } from '../core/core.module';

@Module({
  imports: [TypeOrmModule.forFeature([AppNotification]), CoreModule],
  providers: [
    {
      provide: NOTIFICATION_REPO,
      useClass: AppNotificationRepository,
    },
  ],
  exports: [NOTIFICATION_REPO, TypeOrmModule],
})
export class InfraModule {}