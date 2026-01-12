import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { StatisticsService } from '../statistics.service';

@Injectable()
export class MonthlyStatisticsCron {
  private readonly logger = new Logger(MonthlyStatisticsCron.name);

  constructor(private readonly statisticsService: StatisticsService) {}

  // Se ejecuta cada minuto para que no tengas que esperar
  @Cron('0 1 1 * *') 
  async handleMonthlyStatistics() {
    this.logger.log('--- INICIANDO GENERACIÓN DE INFORME DE PRUEBA ---');

    const now = new Date();
    let month = now.getMonth() + 1; // Mes actual (1-12)
    let year = now.getFullYear();

    if (month === 1) {
      month = 12;
      year -= 1; 
    }

    // Llamamos al servicio
    await this.statisticsService.generateAndNotify(month, year);
    
  }
}
