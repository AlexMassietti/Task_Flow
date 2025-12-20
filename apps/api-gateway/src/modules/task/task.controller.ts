import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth } from "@nestjs/swagger";
import { JwtRs256Guard } from "../auth/jwt-auth.guard";
import { PermissionsGuard } from "../authorization/permission.guard";
import { TaskService } from "./task.service";
import { CreateTaskDto } from "@shared/dtos";
import { Permissions } from '../authorization/permission.decorator';

@Controller('task')
@ApiBearerAuth('access-token')
@UseGuards(JwtRs256Guard, PermissionsGuard)
export class TaskController {
    constructor(private readonly taskService: TaskService) { }

    @Post()
    @Permissions('task.create')
    create(@Body() createTaskDto: CreateTaskDto) {
        return this.taskService.create(createTaskDto);
    }
}