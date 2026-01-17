import { Controller, Get, Post, Body, Param, Delete, ParseIntPipe, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { LeaderboardService } from './leaderboard.service';
import { Task } from '@microservice-tasks/task/entities/task.entity'; // Asegúrate de importar tu entidad Task

@ApiTags('Leaderboard') // Agrupa en Swagger
@Controller('leaderboard')
export class LeaderboardController {
  constructor(private readonly leaderboardService: LeaderboardService) {}

  @Post('process-task')
  @ApiOperation({ 
    summary: 'Procesar puntos de una tarea', 
    description: 'Recibe una tarea completada y actualiza el ranking del usuario' 
  })
  @ApiResponse({ status: 201, description: 'Puntos procesados correctamente' })
  async handleTaskCompletion(@Body() task: Task) {
    // Este método es ideal para ser llamado internamente o vía Webhook
    return await this.leaderboardService.handleTaskCompletion(task);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todo el ranking global' })
  findAll() {
    return this.leaderboardService.findAll();
  }

  @Get('dashboard/:dashboardId')
  @ApiOperation({ summary: 'Obtener el ranking de un dashboard específico' })
  findByDashboard(@Param('dashboardId', ParseIntPipe) dashboardId: number) {
    return this.leaderboardService.getRankingByDashboard(dashboardId);
  }

  @Get('top/:dashboardId/:limit')
  @ApiOperation({ summary: 'Obtener los mejores usuarios de un dashboard'})
  getTopRankings(@Param('dashboardId', ParseIntPipe) dashboardId: number, @Param('limit', ParseIntPipe) limit : number){
    return this.leaderboardService.getTopRankings(dashboardId, limit);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una entrada específica del leaderboard' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.leaderboardService.findOne(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una entrada del ranking' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.leaderboardService.remove(id);
  }
}