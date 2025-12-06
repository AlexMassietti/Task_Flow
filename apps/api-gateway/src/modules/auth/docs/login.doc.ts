import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { LoginUserDto } from '@shared/dtos';

export function LoginDoc() {
  return applyDecorators(
    ApiOperation({
      summary: 'Loguear un usuario',
      description: 'Loguea un usuario retornando su jwt',
    }),

    ApiBody({
      description: 'Datos requeridos para loguear un usuario.',
      type: LoginUserDto,
    }),

    ApiResponse({
      status: 200,
      description: 'Usuario logueado correctamente.',
      schema: {
        example: {
          success: true,
          data: {
            accessToken: '',
            refreshToken: '',
          },
        },
      },
    }),

    ApiResponse({
      status: 401,
      description: 'Credenciales invalidas',
      schema: {
        example: {
          success: false,
          error: {
            status: 401,
            message: 'Invalid credentials.',
            details: null,
          },
        },
      },
    }),

    ApiResponse({
      status: 403,
      description: 'El usuario no tiene roles asignados, poblar la base de datos',
      schema: {
        example: {
          success: false,
          error: {
            status: 403,
            message: 'User has no assigned roles.',
            details: null,
          },
        },
      },
    }),
  );
}
