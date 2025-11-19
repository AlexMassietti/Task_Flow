import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { RemoteError } from './error/remote-error';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USERS_SERVICE') private readonly usersClient: ClientProxy,
  ) {}

  async register(createUserDto: CreateUserDto) {
    try {
      const response: { status: string } = await firstValueFrom(
        this.usersClient.send({ cmd: 'user_register' }, { createUserDto }),
      );

      return {
        success: true,
        data: response,
      };
    } catch (err: unknown) {
      const remoteError = err as RemoteError;

      const status = remoteError.status ?? 500;
      const message =
        remoteError.message ?? 'Unexpected error during user registration';

      return {
        success: false,
        error: {
          statusCode: status,
          message,
          details: remoteError.response ?? null,
        },
      };
    }
  }
}
