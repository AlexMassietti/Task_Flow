import { Dashboard } from 'src/dashboard/entities/dashboard.entity';
import { Priority } from 'src/priority/entities/priority.entity';
import { Status } from 'src/status/entities/status.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @Column()
  finishDate: Date;

  @ManyToOne(() => Status, (status) => status.task, { eager: true })
  @JoinColumn({ name: 'statusId' })
  status: Status;

  @ManyToOne(() => Priority, (priority) => priority.task, { eager: true })
  @JoinColumn({ name: 'priorityId' })
  priority: Priority;

  @ManyToOne(() => Dashboard, (dash) => dash.task)
  @JoinColumn({ name: 'dashboardId' })
  dashboard: Dashboard;

  constructor(
    name: string,
    description: string,
    startDate: Date,
    endDate: Date,
  ) {
    this.name = name;
    this.description = description;
    this.startDate = startDate;
    this.endDate = endDate;
  }
}
