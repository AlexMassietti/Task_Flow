import { IsEmail, IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class DashboardMailDto {
  @IsEmail()
  @IsNotEmpty()
  to: string; // Mapeado desde 'email'

  @IsString()
  @IsNotEmpty()
  invitedBy: string;

  @IsString()
  @IsNotEmpty()
  dashboardName: string;

  @IsUrl()
  @IsNotEmpty()
  inviteLink: string;
}