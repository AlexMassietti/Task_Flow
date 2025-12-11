import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '../jwt/jwt.module';
import { ClientsModule } from '@nestjs/microservices';
import {API_GATEWAY_SERVICE} from '../../../config/api-gateway.config';

@Module({
  imports: [UsersModule, JwtModule, ClientsModule.register([API_GATEWAY_SERVICE])],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
