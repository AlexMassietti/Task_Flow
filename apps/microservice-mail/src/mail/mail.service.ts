import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { PasswordResetDto } from './dto/password-reset.dto';
import { DashboardInvitationDto } from './dto/dashboard-invitation.dto';
import { SendStatsEmailDto } from './dto/send-user-stats.dto';

@Injectable()
export class MailService {
  constructor(
    // Cambiamos el nombre de la cola a algo más genérico, ej: 'mail-queue'
    @InjectQueue('mail-queue') private readonly mailQueue: Queue,
  ) {}

  async sendPasswordReset(data: PasswordResetDto) {
    // Agregamos a la cola con Prioridad 1 (Máxima urgencia)
    await this.mailQueue.add('send-password-reset', data, {
      priority: 1, 
      attempts: 5,
      backoff: { type: 'exponential', delay: 2000 },
      removeOnComplete: true, 
    });

    return { success: true, message: 'Solicitud de restauración encolada' };
  }

  async sendDashboardInvitation(data: DashboardInvitationDto) {
    // Invitaciones también son alta prioridad (Prioridad 1 o 2)
    await this.mailQueue.add('send-dashboard-invitation', data, {
      priority: 2,
      attempts: 3,
      removeOnComplete: true,
    });

    return { success: true, message: 'Invitación encolada' };
  }

  async sendStatsEmail(data: SendStatsEmailDto) {
    const { stats, user, month, year } = data;

    await this.mailQueue.add('send-individual-stats', 
      { user, stats, month, year }, 
      {
        priority: 10,
        attempts: 3,
        backoff: { type: 'exponential', delay: 5000 },
        removeOnComplete: true,
      }
    );

    return { success: true };
  }
  
}