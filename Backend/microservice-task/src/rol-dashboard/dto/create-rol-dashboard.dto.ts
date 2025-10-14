import {
  IsEmail,
  IsNumber,
  IsPositive,
  IsString,
  IsNotEmpty,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRolDashboardDto {
  @ApiProperty({
    description: 'ID del Dashboard al que se está asignando el usuario.',
    example: 101,
  })
  @IsNumber()
  @IsPositive()
  idDashboard: number;

  @ApiProperty({
    description:
      'Email del usuario a asignar (usado para obtener su ID en el microservicio externo).',
    example: 'admin@sistema.com',
  })
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description:
      'ID del tipo de participante (Rol) asignado a este usuario en el Dashboard.',
    example: 3,
  })
  @IsNumber()
  @IsPositive()
  idRol: number;
}
