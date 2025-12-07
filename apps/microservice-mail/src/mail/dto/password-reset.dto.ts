import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
export class PasswordResetDto {
    @IsEmail()
  to: string;
  @IsString()
  @IsNotEmpty()
  username?: string;
  @IsString()
  @IsNotEmpty()
  resetLink: string;
}
