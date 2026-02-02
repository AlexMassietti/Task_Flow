// dashboard-invitation.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Dashboard } from '../../dashboard/entities/dashboard.entity';

export enum InvitationStatus {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED'
}

@Entity()
export class DashboardInvitation {
  @PrimaryGeneratedColumn('uuid') // Usamos UUID para que el token del link sea difícil de adivinar
  id: string;

  @Column()
  email: string; // El mail del invitado

  @Column({ nullable: true })
  invitedUserId: number; // Si el usuario ya existe, guardamos su ID

  @Column()
  invitedByUserId: number;

  @ManyToOne(() => Dashboard)
  dashboard: Dashboard;

  @Column({ type: 'enum', enum: InvitationStatus, default: InvitationStatus.PENDING })
  status: InvitationStatus;

  @CreateDateColumn()
  createdAt: Date;
  
  @Column({ type: 'timestamp', nullable: true })
  expiresAt: Date; // Opcional: para que el link caduque en 24hs
}