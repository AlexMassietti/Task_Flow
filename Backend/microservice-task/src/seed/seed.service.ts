import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Priority } from 'src/priority/entities/priority.entity';
import { Status } from 'src/status/entities/status.entity';
import { Task } from 'src/task/entities/task.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(Status)
    private readonly statusRepository: Repository<Status>,
    @InjectRepository(Priority)
    private readonly priorityRepository: Repository<Priority>,
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}
  async seed() {
    await this.seedStatus();
    await this.seedPriority();
    await this.seedTask();
    return 'Seed executed';
  }
  private async seedStatus() {
    const statusCount = await this.statusRepository.count();
    if (statusCount == 0) {
      await this.statusRepository.save([
        { name: 'Pendiente' },
        { name: 'En progreso' },
        { name: 'Realizada' },
      ]);
      console.log('Status cargado');
    }
  }
  private async seedPriority() {
    const priorityCount = await this.priorityRepository.count();
    if (priorityCount == 0) {
      await this.priorityRepository.save([
        { name: 'Alta' },
        { name: 'Media' },
        { name: 'Baja' },
      ]);
      console.log('Priority cargada');
    }
  }
  private async seedTask() {
    const taskCount = await this.taskRepository.count();
    if (taskCount == 0) {
      await this.taskRepository.save([
        {
          name: 'Configurar entorno',
          description: 'Instalar dependencias y configurar variables',
          startDate: new Date(),
          endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          status: { id: 1 },
          priority: { id: 1 },
          dashboard: 1,
        },
        {
          name: 'Diseñar base de datos',
          description: 'Modelar entidades y relaciones',
          startDate: new Date(),
          endDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
          status: { id: 2 },
          priority: { id: 2 },
          dashboard: 1,
        },
        {
          name: 'Esto es otro ejemplo',
          description: 'Ejemplo de seeder sin endDate',
          startDate: new Date(),
          status: { id: 3 }, // referencia a Status
          priority: { id: 2 }, // referencia a Priority
          dashboard: 1, // número (según tu entidad)
        },
        {
          name: 'Diseño de arquitecturas',
          description: 'Modelar datos',
          startDate: new Date(),
          status: { id: 2 },
          priority: { id: 3 },
          dashboard: 1,
        },
      ]);
    }
  }
}
