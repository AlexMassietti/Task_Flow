import { applyDecorators } from "@nestjs/common";
import { ApiBody, ApiOkResponse, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { DashboardDto } from "../interfaces/dashboard.dto";
import { CreateDashboardDto } from "@shared/dtos";

export function CreateDashboardDoc() {
    return applyDecorators(
        ApiOperation({
            summary: 'Crear un nuevo dashboard',
        }),
        ApiBody({ type: CreateDashboardDto }),
        ApiResponse({
            status: 201,
            description: 'Dashboard correctamente creado',
            type: DashboardDto
        }),
    );
}