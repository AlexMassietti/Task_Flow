import { IsNotEmpty, IsInt } from 'class-validator';

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
