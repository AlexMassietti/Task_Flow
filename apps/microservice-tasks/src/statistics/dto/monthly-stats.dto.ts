import { ApiProperty } from '@nestjs/swagger';
import { IsInt, Max, Min } from 'class-validator';

export class DashboardStatsDto {
  @ApiProperty({ description: 'ID del dashboard', example: 1 })
  @IsInt()
  dashboardId: number;

  @ApiProperty({ description: 'Año de la consulta', example: 2026 })
  @IsInt()
  year: number;

  @ApiProperty({ 
    description: 'Mes de la consulta (1-12)', 
    example: 1,
    minimum: 1,
    maximum: 12 
  })
  @IsInt()
  @Min(1)
  @Max(12)
  month: number;
}