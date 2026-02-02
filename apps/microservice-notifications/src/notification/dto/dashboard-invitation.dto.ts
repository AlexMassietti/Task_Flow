import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class DashboardInvitationDto {
  @ApiProperty({
    example: 'poné_tumail@gmail.com',
    description: 'Email del usuario invitado al dashboard',
  })
  @IsEmail()
  @IsNotEmpty()
  to: string;

  @ApiProperty({
    example: 'Juan Pérez',
    description: 'Nombre del usuario que envía la invitación',
  })
  @IsString()
  @IsNotEmpty()
  invitedBy: string;

  @ApiProperty({
    example: '1',
    description: 'id de quien envía la invitación',
  })
  @IsNumber()
  @IsOptional()
  inviterId: number;

  @ApiProperty({
    example: 'Dashboard de Ventas',
    description: 'Nombre del dashboard al que se invita',
  })
  @IsString()
  @IsNotEmpty()
  dashboardName: string;

  @ApiProperty({
    example: 'https://www.youtube.com/watch?v=4pbWWmUcKSg&list=RD4pbWWmUcKSg&start_radio=1',
    description: 'Link para visitar el dashboard',
  })
  @IsString()
  @IsNotEmpty()
  inviteLink: string;

  @ApiProperty({
    example: 10,
    description: 'ID del recurso relacionado con la invitación',
  })
  @IsNumber()
  @IsOptional()
  relatedResourceId?: number;

  @ApiProperty({
    example: 10,
    description: 'ID del usuario invitado',
  })
  @IsNumber()
  @IsOptional()
  userId?: number;

}
