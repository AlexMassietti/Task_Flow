import { IsArray, ValidateNested, IsNotEmptyObject } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { DashboardStatsDto } from './dashboard-stats.dto';
import { UserDataResponseDto } from './users-data.dto';

export class SendStatsEmailDto {
  
  @ApiProperty({ 
    description: 'Estadísticas detalladas del dashboard',
    type: DashboardStatsDto 
  })
  @ValidateNested()
  @IsNotEmptyObject()
  @Type(() => DashboardStatsDto)
  stats: DashboardStatsDto;

  @ApiProperty({ 
    description: 'Lista de usuarios que recibirán el informe',
    type: [UserDataResponseDto], // Importante: los corchetes indican un array en Swagger
    example: [
      { name: 'Juan Pérez', email: 'juan@example.com' },
      { name: 'Ana Gomez', email: 'ana@example.com' }
    ]
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UserDataResponseDto)
  users: UserDataResponseDto[];
}