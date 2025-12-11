import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private authService: AuthService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();

    const isPublic = this.reflector.getAllAndOverride<boolean>('isPublic', [
      context.getHandler(),
      context.getClass(),
    ]);
    
    if (isPublic) return true;

    const token = request.headers.authorization?.replace('Bearer ', '');
      if (!token) {
        throw new UnauthorizedException('No token provided');
      }

    const permissions: string[] =
      this.reflector.get<string[]>('permissions', context.getHandler()) || [];

    await this.authService.validateTokenAndPermissions(token, permissions);

    return true;
  }
}
