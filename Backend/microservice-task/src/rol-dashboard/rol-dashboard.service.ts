import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { RolDashboard } from './entities/rol-dashboard.entity';
import { Dashboard } from 'src/dashboard/entities/dashboard.entity';
import { ParticipantType } from 'src/participant-type/entities/participant-type.entity';
import { CreateRolDashboardDto } from './dto/create-rol-dashboard.dto';
import { UpdateRolDashboardDto } from './dto/update-rol-dashboard.dto';
import { IDashboardRepository } from 'src/dashboard/infraestructure/dashboard.interface';

// Tipado explícito de la respuesta esperada del microservicio de usuarios
interface UserIdResponse {
  id: number;
}

@Injectable()
export class RolDashboardService {
  private readonly userMicroserviceUrl =
    'http://localhost:3001/users/getIdbyEmail';

  constructor(
    @InjectRepository(RolDashboard)
    private readonly rolDashboardRepository: Repository<RolDashboard>,

    @Inject('IDashboardRepository')
    private readonly dashboardRepository: IDashboardRepository,

    @InjectRepository(ParticipantType)
    private readonly participantTypeRepository: Repository<ParticipantType>,

    private readonly httpService: HttpService,
  ) {}

  /**
   * Crear una nueva relación entre rol y dashboard, asociada a un usuario (por email)
   */
  async create(
    createRolDashboardDto: CreateRolDashboardDto & { email: string },
  ): Promise<RolDashboard> {
    const { idDashboard, idRol, email } = createRolDashboardDto;

    // Validar existencia del dashboard
    const dashboardExists = await this.dashboardRepository.findOne(idDashboard);
    if (!dashboardExists) {
      throw new NotFoundException(
        `Dashboard con ID ${idDashboard} no encontrado`,
      );
    }

    // Validar existencia del rol (ParticipantType)
    const rolExists = await this.participantTypeRepository.findOneBy({
      id: idRol,
    });
    if (!rolExists) {
      throw new NotFoundException(
        `ParticipantType (Rol) con ID ${idRol} no encontrado`,
      );
    }

    // Obtener ID de usuario desde el microservicio de usuarios
    let finalUserId: number;
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const response = await firstValueFrom(
        this.httpService.get<UserIdResponse>(this.userMicroserviceUrl, {
          params: { email },
        }),
      );

      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (!response.data || typeof response.data.id !== 'number') {
        throw new NotFoundException(
          `El microservicio no devolvió un ID válido para el email ${email}`,
        );
      }

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      finalUserId = response.data.id;
    } catch (error) {
      console.error(
        'Error al comunicarse con el microservicio de usuarios:',
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        error.message,
      );

      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (error.response?.status === 404) {
        throw new NotFoundException(
          `El usuario con email ${email} no existe en el microservicio externo`,
        );
      }

      throw new InternalServerErrorException(
        'Error al validar el usuario externo',
      );
    }

    // Crear la nueva relación RolDashboard
    const newRolDashboard = this.rolDashboardRepository.create({
      dashboardId: { id: idDashboard } as Dashboard,
      participantTypeId: { id: idRol } as ParticipantType,
      idUser: finalUserId,
    });

    return this.rolDashboardRepository.save(newRolDashboard);
  }

  /**
   * Obtener todas las relaciones RolDashboard
   */
  async findAll(): Promise<RolDashboard[]> {
    return this.rolDashboardRepository.find({
      relations: ['dashboardId', 'participantTypeId'],
    });
  }

  async findOne(id: number): Promise<RolDashboard> {
    const rolDashboard = await this.rolDashboardRepository.findOne({
      where: { id },
      relations: ['dashboardId', 'participantTypeId'],
    });

    if (!rolDashboard) {
      throw new NotFoundException(
        `Relación RolDashboard con ID ${id} no encontrada`,
      );
    }

    return rolDashboard;
  }

  /**
   * Actualizar una relación RolDashboard
   */
  async update(
    id: number,
    updateRolDashboardDto: UpdateRolDashboardDto,
  ): Promise<RolDashboard> {
    const existingRolDashboard = await this.rolDashboardRepository.findOneBy({
      id,
    });
    if (!existingRolDashboard) {
      throw new NotFoundException(
        `Relación RolDashboard con ID ${id} no encontrada para actualizar`,
      );
    }

    const updateObject: Partial<RolDashboard> = {};
    let shouldUpdate = false;

    if (updateRolDashboardDto.idDashboard) {
      const dashboardExists = await this.dashboardRepository.findOne(
        updateRolDashboardDto.idDashboard,
      );
      if (!dashboardExists) {
        throw new NotFoundException(
          `Dashboard con ID ${updateRolDashboardDto.idDashboard} no encontrado`,
        );
      }
      updateObject.dashboardId = {
        id: updateRolDashboardDto.idDashboard,
      } as Dashboard;
      shouldUpdate = true;
    }

    if (updateRolDashboardDto.idRol) {
      const rolExists = await this.participantTypeRepository.findOneBy({
        id: updateRolDashboardDto.idRol,
      });
      if (!rolExists) {
        throw new NotFoundException(
          `ParticipantType (Rol) con ID ${updateRolDashboardDto.idRol} no encontrado`,
        );
      }
      updateObject.participantTypeId = {
        id: updateRolDashboardDto.idRol,
      } as ParticipantType;
      shouldUpdate = true;
    }

    if (updateRolDashboardDto.idUser) {
      updateObject.idUser = updateRolDashboardDto.idUser;
      shouldUpdate = true;
    }

    if (!shouldUpdate) {
      return existingRolDashboard;
    }

    const updatedRolDashboard = this.rolDashboardRepository.merge(
      existingRolDashboard,
      updateObject,
    );
    return this.rolDashboardRepository.save(updatedRolDashboard);
  }

  /**
   * Eliminar una relación RolDashboard
   */
  async remove(id: number): Promise<{ message: string }> {
    const result = await this.rolDashboardRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(
        `Relación RolDashboard con ID ${id} no encontrada para eliminar`,
      );
    }

    return {
      message: `Relación RolDashboard con ID ${id} eliminada exitosamente`,
    };
  }
}
