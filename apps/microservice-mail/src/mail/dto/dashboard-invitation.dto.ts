import { IsEmail, IsNotEmpty,IsString} from 'class-validator';

export class DashboardInvitationDto {
    @IsEmail()
    @IsNotEmpty()
  to: string;            // Email del invitado
  @IsString()
  @IsNotEmpty()
  invitedBy: string;     // Nombre del usuario que invita
  @IsString()
  @IsNotEmpty()
  dashboardName: string; // Nombre del dashboard
  @IsString()
  @IsNotEmpty()
  inviteLink: string;    // Link para aceptar la invitación
}
