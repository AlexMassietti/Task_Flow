import { Dashboard } from '@microservice-tasks/dashboard/entities/dashboard.entity';
import { ParticipantType } from '@microservice-tasks/participant-type/entities/participant-type.entity';
import { PrimaryGeneratedColumn, Entity, ManyToOne, Column, JoinColumn } from 'typeorm';

@Entity('rol_dashboard')
export class RolDashboard {
  @PrimaryGeneratedColumn()
  id?: number;

  @ManyToOne(() => Dashboard, (dashboard) => dashboard.id, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'idDashboard' })
  dashboardId: Partial<Dashboard>;   // 🔥 acepta { id: number }

  @ManyToOne(() => ParticipantType, (participant) => participant.id, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'idRol' })
  participantTypeId: Partial<ParticipantType>;   // 🔥 acepta { id: number }

  @Column({
    name: 'idUser',
    type: 'bigint',
    transformer: {
      to: (value) => value,
      from: (value) => parseInt(value)
    }
  })
  idUser: number;
}
