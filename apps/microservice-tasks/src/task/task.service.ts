import { HttpStatus, Inject, Injectable} from '@nestjs/common';
import { CreateTaskDto } from '@shared/dtos';
import { UpdateTaskDto } from '@shared/dtos';
import { Task } from './entities/task.entity';
import { TaskResponseDto } from '@shared/dtos';
import { RpcException } from '@nestjs/microservices';
import { DASHBOARD_REPO, LEADERBOARD_REPO, PRIORITY_REPO, STATUS_REPO, TASK_REPO } from '@microservice-tasks/core/ports/tokens';
import { ITaskRepository } from '@microservice-tasks/core/ports/task.interface';
import { IPriorityRepository } from '@microservice-tasks/core/ports/priority.interface';
import { IStatusRepository } from '@microservice-tasks/core/ports/status.interface';
import { IDashboardRepository } from '@microservice-tasks/core/ports/dashboard.interface';
import { ILeaderboardRepository } from '@microservice-tasks/core/ports/leaderboard.interface';
import { LeaderboardService } from '@microservice-tasks/leaderboard/leaderboard.service';

@Injectable()
export class TaskService {
  constructor(
    @Inject(TASK_REPO)
    private readonly taskRepository: ITaskRepository,

    @Inject(PRIORITY_REPO)
    private readonly priorityRepository: IPriorityRepository,

    @Inject(STATUS_REPO)
    private readonly statusRepository: IStatusRepository,

    @Inject(DASHBOARD_REPO)
    private readonly dashboardRepository: IDashboardRepository,
    @Inject(LEADERBOARD_REPO) private readonly leaderboardRepository: ILeaderboardRepository,
    private readonly leaderboardService: LeaderboardService,
  ) { }
  async create(createTaskDto: CreateTaskDto): Promise<TaskResponseDto> {
    const { name, description, priorityId, endDate, statusId, dashboardId, completedByUserId } = createTaskDto;

    const statusTask = statusId 
      ? await this.statusRepository.findOne(statusId) 
      : await this.statusRepository.findOneByName('Pending');

    const priority = priorityId 
      ? await this.priorityRepository.findOne(priorityId) 
      : await this.priorityRepository.findOneByName('Undefined');

    const dashboard = await this.dashboardRepository.findOne(dashboardId);

    if (!statusTask) throw new RpcException({ message: 'Status not found', status: HttpStatus.NOT_FOUND });
    if (!priority) throw new RpcException({ message: 'Priority not found', status: HttpStatus.NOT_FOUND });
    if (!dashboard) throw new RpcException({ message: 'Dashboard not found', status: HttpStatus.NOT_FOUND });

    const isCompleted = statusTask.name === 'Completed';
    
    if (isCompleted && !completedByUserId) {
      throw new RpcException({
        message: 'CompletedByUserId is required when status is Completed',
        status: HttpStatus.BAD_REQUEST
      });
    }

    // 4. CREACIÓN DE LA TAREA
    const task = await this.taskRepository.create({
      name,
      description,
      endDate,
      startDate: new Date(),
      finishDate: isCompleted ? new Date() : null, // Seteamos fecha fin si nace completada
      statusId: statusTask.id,
      priorityId: priority.id,
      dashboardId,
      completedByUserId: isCompleted ? completedByUserId : null,
    });

    const savedTask = await this.taskRepository.save(task);

    if (isCompleted) {
      await this.leaderboardService.handleTaskCompletion(savedTask)
    }

    return savedTask;
  }

    findAll(): Promise<Task[]> {
      return this.taskRepository.findAll();
    }

    findOne(id: number): Promise<Task | null> {
      return this.taskRepository.findOne(id);
    }

    async update(id: number, updateTaskDto: UpdateTaskDto) {
      try {
        return await this.taskRepository.update(id, updateTaskDto);
      } catch (error) {
        throw new RpcException({
          status: HttpStatus.NOT_FOUND,
          error: error.response.error,
          message: error.response.message
        })
      }
  }

  async remove(id: number): Promise<void> {
    try {
      return await this.taskRepository.remove(id);
    } catch (error) {
      throw new RpcException({
        status: HttpStatus.NOT_FOUND,
        error: error.response.error,
        message: error.response.message
      })
    }
  }

  async findTasksWithDashboardId(dashboardId: number): Promise<Task[]> {
    return this.taskRepository.findAllWithDashboardId(dashboardId);
  }
}
