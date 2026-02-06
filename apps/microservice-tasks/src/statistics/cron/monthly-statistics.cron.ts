import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { StatisticsService } from '../statistics.service';

@Injectable()
export class MonthlyStatisticsCron {
  private readonly logger = new Logger(MonthlyStatisticsCron.name);

  constructor(private readonly statisticsService: StatisticsService) {}

  //@Cron(CronExpression.EVERY_MINUTE) // <-- Descomenta esto para pruebas cada minuto
  @Cron('0 0 1 * *') 
  async handleMonthlyStatistics() {
    this.logger.log('Starting monthly statistics report generation...');
    
    const now = new Date();
    let month = now.getMonth() + 1; 
    let year = now.getFullYear();

    // Lógica para obtener el mes ANTERIOR (el mes que acaba de cerrar)
    if (month === 1) {
      month = 12;
      year -= 1;
    } else {
      month -= 1;
    }

    try {
      await this.statisticsService.generateUserMonthlyReport(month, year);
      this.logger.log(`Reports successfully processed for period ${month}/${year}`);
    } catch (error) {
      this.logger.error(`Error in scheduled task: ${error.message}`);
    }
  }
}