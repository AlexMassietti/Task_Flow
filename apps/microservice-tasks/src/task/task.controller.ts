import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from '@shared/dtos';
import { UpdateTaskDto } from '@shared/dtos';
import { ApiTags } from '@nestjs/swagger';
import { Task } from './entities/task.entity';
import { MessagePattern } from '@nestjs/microservices';

@ApiTags('Tasks')
@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) { }

  @MessagePattern({ cmd: 'create_task' })
  create(data: { createTaskDto: CreateTaskDto }) {
    return this.taskService.create(data.createTaskDto);
  }

  @Get()
  async findAll() {
    const tasks = await this.taskService.findAll();
    return tasks;
    // return tasks.map((task) => new TaskResponseDto(task));
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const task = await this.taskService.findOne(+id);
    if (!task) {
      return null;
    }
    return task;
    // return new TaskResponseDto(task);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.taskService.update(+id, updateTaskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.taskService.remove(+id);
  }

  @MessagePattern({ cmd: 'get_dashboard_tasks' })
  findTasksWithDashboardId(data: { id: number }): Promise<Task[]> {
    return this.taskService.findTasksWithDashboardId(data.id);
  }
}
