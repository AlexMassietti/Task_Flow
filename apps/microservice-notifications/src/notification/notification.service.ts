import { Inject, Injectable } from "@nestjs/common/decorators/core";
import { INotificationRepository, NOTIFICATION_REPO } from "../core/ports/notification.interface";

@Injectable()
export class NotificationService {
  constructor(
    @Inject(NOTIFICATION_REPO)
    private readonly notificationRepository: INotificationRepository,
  ) {}

  async getMyNotifications(userId: number) {
    return await this.notificationRepository.findAllByUserId(userId);
  }

  async readNotification(id: number) {
    return await this.notificationRepository.markAsRead(id);
  }
}