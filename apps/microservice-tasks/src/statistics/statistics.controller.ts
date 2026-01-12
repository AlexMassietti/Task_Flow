import { Controller, Get, Param} from '@nestjs/common';
import { StatisticsService } from './statistics.service';
// Importamos los decoradores de Swagger
import { ApiOperation,  ApiResponse, ApiTags } from '@nestjs/swagger';
import { DashboardStatsDto } from './dto/monthly-stats.dto';

@ApiTags('Statistics') // Agrupa estos endpoints bajo la categoría "Statistics" en la UI
@Controller('statistics')
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  @Get('monthly/:dashboardId/:year/:month')
@ApiOperation({ summary: 'Obtener estadísticas mensuales' })
@ApiResponse({ status: 200, description: 'Stats generadas', type: DashboardStatsDto }) 
async getMonthlyStats(@Param() dto: DashboardStatsDto) {
  return this.statisticsService.generateMonthlyStats(dto);
}

}