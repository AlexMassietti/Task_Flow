import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsOptional()
  @IsDateString()
  endDate: Date;

  @IsNumber()
  @IsOptional()
  @IsPositive()
  statusId: number;

  @IsNumber()
  @IsOptional()
  @IsPositive()
  priorityId: number;
}
