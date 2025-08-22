import { Task } from 'src/task/entities/task.entity';
import { Entity, Column, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Priority {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  descripcion: string;

  @OneToMany(() => Task, (task) => task.priority)
  task: Task[];

  constructor(name: string, descripcion: string) {
    this.name = name;
    this.descripcion = descripcion;
  }
}
