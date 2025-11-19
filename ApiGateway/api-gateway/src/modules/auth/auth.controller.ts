import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthService } from './auth.service';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('register')
  @ApiOperation({
    summary: 'Registrar un nuevo usuario',
    description: 'Crea un usuario enviando los datos básicos necesarios.',
  })
  @ApiBody({
    description: 'Datos requeridos para registrar un usuario.',
    type: CreateUserDto,
  })
  @ApiResponse({
    status: 201,
    description: 'Usuario creado correctamente.',
    schema: {
      example: {
        success: true,
        data: {
          message: 'User successfully created',
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Email o username ya registrados.',
    schema: {
      example: {
        success: false,
        error: {
          statusCode: 'error',
          message: 'Internal server error',
          details: null,
        },
      },
    },
  })
  register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }
}
