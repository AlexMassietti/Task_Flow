import { IsNotEmpty, IsInt, IsEmail } from 'class-validator';

export class DashboardInvitationDto {
  @IsEmail()
  @IsNotEmpty()
  to: string; //mail del invitado

  @IsInt()
  @IsNotEmpty()
  invitedBy: number; //id del que invita

  @IsInt()
  @IsNotEmpty()
  dashboardId: number;

}
