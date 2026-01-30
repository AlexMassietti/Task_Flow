import { Controller } from '@nestjs/common/decorators/core';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { NotificationService } from './notification.service';
import { Get, Param, Patch } from '@nestjs/common/decorators/http';
import { ParseIntPipe } from '@nestjs/common/pipes/parse-int.pipe';
import { AppNotification } from './entities/notification.entity';
import { MessagePattern } from '@nestjs/microservices';

@ApiTags('Notifications')
@Controller('notifications')
export class NotificationController {
  constructor(private readonly service: NotificationService) {}

  @Get('user/:userId')
  @ApiOperation({ summary: 'Obtener notificaciones de un usuario' })
  @ApiResponse({ status: 200, type: [AppNotification] })
  findAll(@Param('userId', ParseIntPipe) userId: number) {
    return this.service.getMyNotifications(userId);
  }

  @MessagePattern('get_notifications')
  getNotifications(data: { userId: number }) {
    return this.service.getMyNotifications(data.userId);
  }

  @Patch(':id/read')
  @ApiOperation({ summary: 'Marcar notificación como leída' })
  markRead(@Param('id', ParseIntPipe) id: number) {
    return this.service.readNotification(id);
  }

  @MessagePattern('check_as_read')
  checkAsRead(data: { notificationId: number}){
    return this.service.readNotification(data.notificationId);
  }
}