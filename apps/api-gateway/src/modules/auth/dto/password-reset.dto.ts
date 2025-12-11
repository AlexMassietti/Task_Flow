// dto/password-reset.dto.ts
export class PasswordResetDto {
  to: string;
  username: string;
  resetLink: string;
}
