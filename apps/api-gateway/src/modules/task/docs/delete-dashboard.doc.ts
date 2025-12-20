import { applyDecorators } from "@nestjs/common";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";

export function DeleteTaskDoc() {
    return applyDecorators(
        ApiOperation({
            summary: 'Eliminar una tarea',
        }),

        ApiResponse({
            status: 204,
            description: 'Tarea correctamente eliminada',
        }),

        ApiResponse({
            status: 404,
            description: 'La tarea no existe',
            schema: {
                example: {
                    error: {
                        status: 404,
                        message: "Task with id: ${id} not found",
                        details: null,
                    },
                },
            },
        }),

        ApiResponse({
            status: 401,
            description: 'El usuario no está logueado',
            schema: {
                example: {
                    statusCode: 401,
                    error: "Unauthorized",
                    message: "Missing Authorization header",
                },
            },
        }),

    );
}