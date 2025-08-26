import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';
import { Priority } from 'src/priority/entities/priority.entity';
import { Status } from 'src/status/entities/status.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,

    @InjectRepository(Priority)
    private readonly priorityRepository: Repository<Priority>,

    @InjectRepository(Status)
    private readonly statusRepository: Repository<Status>,
  ) {}
  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const { name, description, priorityId, endDate, statusId } = createTaskDto;

    const defaultStatusId = 1;

    const status = await this.statusRepository.findOneBy({
      id: statusId ?? defaultStatusId,
    });
    if (!status) {
      throw new NotFoundException(
        `Status con id ${statusId ?? defaultStatusId} no existe`,
      );
    }

    const priority = await this.priorityRepository.findOneBy({
      id: priorityId,
    });
    if (!priority) {
      throw new NotFoundException(`Priority con id ${priorityId} no existe`);
    }

    const task = this.taskRepository.create({
      name,
      description,
      endDate,
      startDate: new Date(),
      status,
      priority,
    });

    return await this.taskRepository.save(task);
  }

  findAll() {
    return `This action returns all task`;
  }

  findOne(id: number) {
    return `This action returns a #${id} task`;
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    return this.findOne(id);
  }

  remove(id: number) {
    return `This action removes a #${id} task`;
  }
}
