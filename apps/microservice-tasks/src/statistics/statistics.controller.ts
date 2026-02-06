import { Controller, Get, Post, Param, ParseIntPipe, Query } from '@nestjs/common';
import { StatisticsService } from './statistics.service';
import { ApiOperation, ApiResponse, ApiTags, ApiQuery } from '@nestjs/swagger';
import { DashboardInfoDto } from './dto/dashboard-info.dto';

@ApiTags('Statistics')
@Controller('statistics')
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  @Get('monthly/:dashboardId/:year/:month')
  @ApiOperation({ 
    summary: 'Obtener estadísticas mensuales de un dashboard específico',
    description: 'Retorna el cálculo de tareas para la visualización en la UI.' 
  })
  @ApiResponse({ status: 200, description: 'Estadísticas obtenidas con éxito.' })
  async getMonthlyStats(@Param() dto: DashboardInfoDto) {
    return this.statisticsService.getDashboardStats(dto, dto.month, dto.year);
  } 
  @Post('report/monthly-consolidated')
  @ApiOperation({ 
    summary: 'Generar reporte mensual masivo para todos los usuarios',
    description: 'Inicia el proceso de cálculo de estadísticas y envío de correos/notificaciones para todos los usuarios activos.' 
  })
  @ApiQuery({ name: 'month', type: Number, example: 1, description: 'Mes del reporte (1-12)' })
  @ApiQuery({ name: 'year', type: Number, example: 2026, description: 'Año del reporte' })
  @ApiResponse({ status: 202, description: 'El proceso de generación de reportes ha sido iniciado.' })
  async generateMonthlyReport(
    @Query('month', ParseIntPipe) month: number,
    @Query('year', ParseIntPipe) year: number,
  ) {

    this.statisticsService.generateUserMonthlyReport(month, year);
    
    return {
      message: 'Proceso de generación de reportes masivos iniciado exitosamente.',
      period: `${month}/${year}`
    };
  }
}