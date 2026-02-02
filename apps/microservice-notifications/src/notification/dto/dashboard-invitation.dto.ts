import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class DashboardNotificationDto {
  @ApiProperty({
    example: 41,
    description: 'ID del usuario que recibirá la notificación',
  })
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @ApiProperty({
    example: 'admin',
    description: 'Nombre del usuario que envió la invitación',
  })
  @IsString()
  @IsNotEmpty()
  invitedBy: string;

  @ApiProperty({
    example: 'Panel de Control de Ventas',
    description: 'Nombre del dashboard al que se está invitando',
  })
  @IsString()
  @IsNotEmpty()
  dashboardName: string;

  @ApiProperty({
    example: '8b04f31d-990c-4ad3-ba9b-17e2b0b95586',
    description: 'UUID de la invitación almacenada en la base de datos',
    required: false,
  })
  @IsString()
  @IsOptional()
  relatedResourceId?: string;
}