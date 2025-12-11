import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
  ForbiddenException,
  Inject,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { RestorePasswordDto } from './dto/restore-password.dto';
import { UsersService } from '../users/users.service';
import { JwtService } from '../jwt/jwt.service';
import { Payload } from '../jwt/interfaces/payload.interface';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,

    @Inject('API_GATEWAY_SERVICE')
    private readonly apiGatewayClient: ClientProxy,
  ) {}

  async register(createUserDto: CreateUserDto): Promise<{ status: string }> {
    await this.usersService.register(createUserDto);
    return { status: 'User created successfully' };
  }

  /**
   * Inicio de sesión
   */
  async login(loginUserDto: LoginUserDto): Promise<{ accessToken: string; refreshToken: string }> {
    const user = await this.usersService.login(loginUserDto);
    const permissions = user.roles.flatMap((role) =>
      role.permissions.map((p) => p.name),
    );

    const payload = {
      email: user.email,
      sub: user.id,
      rolesId: user.roles.map((r) => r.id),
      rolesCode: user.roles.map((r) => r.code),
      permissions,
    };

    return {
      accessToken: this.jwtService.generateToken(payload, 'JWT_AUTH'),
      refreshToken: this.jwtService.generateToken(payload, 'JWT_REFRESH'),
    };
  }

  /**
   * Forgot password → envía correo con link de reseteo
   */
  async forgotPassword(email: string) {
    const user = await this.usersService.findOneByEmailWithRolesAndPermissions(email);

    if (!user) {
      throw new BadRequestException('Email not found');
    }

    const resetLink = `http://localhost:4200/auth/restore-password?email=${email}`;

    return {
      to: user.email,
      username: user.name,
      resetLink,
    };
  }

  /**
   * Restore password → actualiza la contraseña
   */
  async restorePassword(body: RestorePasswordDto) {
    const { email, password } = body;

    const user = await this.usersService.findOneByEmailWithRolesAndPermissions(email);
    if (!user) {
      throw new BadRequestException('Email not found');
    }

    await this.usersService.updatePassword(user.id, password);

    return { message: 'Password updated successfully' };
  }

  /**
   * Validación de tokens y permisos
   */
  async validateTokenAndPermissions(
    authorization: string,
    requiredPermissions: string[],
  ): Promise<boolean> {
    const token = authorization?.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException('Token no proporcionado o formato incorrecto.');
    }

    let payload: Payload;
    try {
      payload = this.jwtService.getPayload(token, 'JWT_AUTH');
    } catch {
      throw new UnauthorizedException('Token inválido o expirado.');
    }

    const user = await this.usersService.findOneByEmailWithRolesAndPermissions(payload.email);
    if (!user) {
      throw new UnauthorizedException('Usuario no encontrado.');
    }

    const userPermissions = user.roles.flatMap((role) =>
      role.permissions?.map((p) => p.name) ?? [],
    );

    // Si el endpoint no pide permisos → dejar pasar
    if (!requiredPermissions?.length) {
      return true;
    }

    // Si el usuario no tiene roles, no tiene permisos
    if (userPermissions.length === 0) {
      throw new ForbiddenException('Missing required permissions.');
    }

    const hasAllPermissions = requiredPermissions.every((perm) =>
      userPermissions.includes(perm),
    );

    if (!hasAllPermissions) {
      throw new ForbiddenException('Missing required permissions.');
    }

    return true;
  }   


}
