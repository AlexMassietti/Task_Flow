import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsPositive, IsNotEmpty } from 'class-validator';

export class CreateLeaderboardDto {
  @ApiProperty({ description: 'ID del usuario (proviene del microservicio de usuarios)', example: 1 })
  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  userId: number;

  @ApiProperty({ description: 'ID del dashboard al que pertenece el ranking', example: 10 })
  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  dashboardId: number;

  @ApiProperty({ description: 'Puntos iniciales obtenidos', example: 50 })
  @IsInt()
  @IsNotEmpty()
  totalPoints: number;

  @ApiProperty({ description: 'Cantidad de tareas completadas inicial', example: 1 })
  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  tasksCompleted: number;
}