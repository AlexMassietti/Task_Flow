import { TaskImage } from "@microservice-tasks/task/entities/task-image.entity";

export interface ITaskImageRepository {
    create(url: string): Promise<TaskImage>;

    findOne(url: string): Promise<TaskImage>;

    remove(url: string): Promise<void>;
}