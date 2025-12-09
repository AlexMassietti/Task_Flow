import { IsEmail, IsInt, IsNotEmpty, IsString } from 'class-validator';

export class DashboardInvitationDto {
  @IsInt()
  @IsNotEmpty()
  to: number;

  @IsInt()
  @IsNotEmpty()
  invitedBy: number; //id del que invita

  @IsInt()
  @IsNotEmpty()
  dashboardId: number;

}
