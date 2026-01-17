import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, IsPositive } from 'class-validator';

export class UpdateLeaderboardDto {
  @ApiPropertyOptional({ description: 'Puntos totales actualizados', example: 150 })
  @IsInt()
  @IsOptional()
  totalPoints?: number;

  @ApiPropertyOptional({ description: 'Total de tareas completadas', example: 5 })
  @IsInt()
  @IsPositive()
  @IsOptional()
  tasksCompleted?: number;
}