import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePermissionDto {
  @IsString()
  @ApiProperty({
    description: 'Nombre del permiso',
  })
  name: string;

  @IsString()
  @ApiProperty({
    description: 'Descripción del permiso',
  })
  description: string;
}
