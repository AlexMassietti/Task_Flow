import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { InfraModule } from '@microservice-tasks/infra/infra.module';
import { TaskRepository } from '@microservice-tasks/infra/typeorm/task.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';

@Module({
  imports: [
    InfraModule,
    TypeOrmModule.forFeature([Task])
  ],
  controllers: [TaskController],
  providers: [TaskService, TaskRepository],
  exports: [TaskRepository],
})
export class TaskModule { }
