import { IsEmail, IsInt, IsNotEmpty, IsString } from 'class-validator';

export class DashboardInvitationDto {
  @IsEmail()
  @IsNotEmpty()
  to: string;

  @IsInt()
  @IsNotEmpty()
  invitedBy: number; //id del que invita

  @IsInt()
  @IsNotEmpty()
  dashboardId: number;

}
