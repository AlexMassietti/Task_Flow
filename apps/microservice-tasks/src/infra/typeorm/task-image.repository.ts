import { ITaskImageRepository } from "@microservice-tasks/core/ports/task-image.interface";
import { TaskImage } from "@microservice-tasks/task/entities/task-image.entity";
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class TaskImageRepository implements ITaskImageRepository {
    constructor(
        @InjectRepository(TaskImage)
        private readonly taskImageRepository: Repository<TaskImage>
    ) { }

    create(url: string): Promise<TaskImage> {
        const taskImage = this.taskImageRepository.create({ url });
        return this.taskImageRepository.save(taskImage);
    }

    async findOne(url: string): Promise<TaskImage> {
        const image = await this.taskImageRepository.findOne({ where: { url } });

        if (!image) {
            throw new NotFoundException(`Image with url: ${url} not found`);
        }

        return image;
    }

    async remove(url: string): Promise<void> {
        await this.taskImageRepository
            .createQueryBuilder()
            .delete()
            .where("url = :url", { url: url })
            .execute();
    }

}