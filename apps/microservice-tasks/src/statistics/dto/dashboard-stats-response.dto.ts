import { ApiProperty } from '@nestjs/swagger';
import { 
  IsNumber, 
  IsString, 
  IsNotEmpty, 
  Min, 
  Max, 
  Matches, 
  IsUrl
} from 'class-validator';

export class DashboardStatsResponseDto {
  
  @ApiProperty({ 
    example: 'http://localhost:4200/dashboard/123', 
    description: 'Enlace directo al dashboard' 
  })
  @IsString()
  @IsUrl()
  @IsNotEmpty()
  dashboardLink: string;

  @ApiProperty({ example: 'Principal Dashboard', description: 'Nombre descriptivo del dashboard' })
  @IsString()
  @IsNotEmpty()
  dashboardName: string;

  @ApiProperty({ example: 2025, description: 'Año del informe' })
  @IsNumber()
  @Min(2000)
  @Max(2100)
  year: number;

  @ApiProperty({ example: 12, description: 'Mes del informe (1-12)' })
  @IsNumber()
  @Min(1)
  @Max(12)
  month: number;

  @ApiProperty({ example: 10, description: 'Cantidad total de tareas en el mes' })
  @IsNumber()
  @Min(0)
  totalTasks: number;

  @ApiProperty({ example: 5, description: 'Tareas con estado "Realizada"' })
  @IsNumber()
  @Min(0)
  completedTasks: number;

  @ApiProperty({ example: 3, description: 'Tareas con estado "Pendiente"' })
  @IsNumber()
  @Min(0)
  pendingTasks: number;

  @ApiProperty({ example: 2, description: 'Tareas con estado "En progreso"' })
  @IsNumber()
  @Min(0)
  inProgressTasks: number;

  @ApiProperty({ 
    example: '50%', 
    description: 'Porcentaje de finalización formateado como string' 
  })
  @IsString()
  @Matches(/^\d+%$/, { message: 'completionRate debe ser un número seguido del símbolo %' })
  completionRate: string;
}