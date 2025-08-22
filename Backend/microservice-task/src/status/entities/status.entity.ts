import { Task } from 'src/task/entities/task.entity';
import { Entity, Column, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Status {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @OneToMany(() => Task, (task) => task.status)
  task: Task[];
  constructor(name: string, description: string) {
    this.name = name;
    this.description = description;
  }
}
