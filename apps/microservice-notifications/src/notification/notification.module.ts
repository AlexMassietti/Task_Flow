import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import { InfraModule } from '../infra/infra.module';

@Module({
  imports: [InfraModule], 
  controllers: [NotificationController],
  providers: [NotificationService],
})
export class NotificationModule {}
