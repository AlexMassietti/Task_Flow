import { PrimaryGeneratedColumn, Entity, Column } from 'typeorm';

@Entity('rol_dashboard')
export class RolDashboard {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ name: 'idDashboard', type: 'bigint' })
  dashboardId: number;

  @Column({ name: 'idRol', type: 'bigint' })
  participantTypeId: number;

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
