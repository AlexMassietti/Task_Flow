import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { Type } from "class-transformer";

export class DashboardInfoDto {
  @ApiProperty({ example: 25, description: 'ID del dashboard' })
  @Type(() => Number) // Esto es vital para que @Param() convierta el string de la URL a number
  @IsNumber()
  @IsNotEmpty()
  dashboardId: number;

  @ApiProperty({ example: 2026, description: 'Año' })
  @Type(() => Number)
  @IsNumber()
  year: number;

  @ApiProperty({ example: 2, description: 'Mes' })
  @Type(() => Number)
  @IsNumber()
  month: number;
  
  @ApiProperty({ example: 'Prueba 5', description: 'Nombre del dashboard' })
  @IsString()
  @IsOptional()
  dashboardName?: string;
  
  @ApiProperty({ example: 'http://localhost:4200/dashboard/1', description: 'Link hacia el dashboard' })
  @IsString()
  @IsOptional()
  dashboardLink?: string;
}