import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateUserDto } from '@shared/dtos';

export function RegisterDoc() {
  return applyDecorators(
    ApiOperation({
      summary: 'Registrar un nuevo usuario',
      description: 'Crea un usuario enviando los datos básicos necesarios.',
    }),

    ApiBody({
      description: 'Datos requeridos para registrar un usuario.',
      type: CreateUserDto,
    }),

    ApiResponse({
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
    }),

    ApiResponse({
      status: 409,
      description: 'Email o username ya registrados.',
      schema: {
        example: {
          success: false,
          error: {
            statusCode: 409,
            message: 'Email already registered.',
            details: { field: 'email' },
          },
        },
      },
    }),
  );
}
