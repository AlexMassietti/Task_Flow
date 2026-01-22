import { join } from 'path';
import { existsSync, unlink } from 'fs';

import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

import { TASK_IMAGE_REPO } from '@microservice-tasks/core/ports/tokens';
import { ITaskImageRepository } from '@microservice-tasks/core/ports/task-image.interface';

@Injectable()
export class FilesService {
  constructor(
    @Inject(TASK_IMAGE_REPO)
    private readonly taskImageRepository: ITaskImageRepository,
  ) { }

  getStaticTaskImage(imagePath: string) {

    if (!existsSync(imagePath))
      throw new RpcException({
        message: `No task found with image`,
        status: HttpStatus.BAD_REQUEST
      });
    return imagePath;
  }

  async deleteImage(imageName: string) {
    const imagePath = join(__dirname, '../../../static/tasks', imageName);
    const imageUrl = join('static/tasks/', imageName)
    try {
      await this.taskImageRepository.findOne(imageUrl);

      await this.taskImageRepository.remove(imageUrl);

      unlink(imagePath, (err) => {
        if (err) throw err;
        console.log(`${imagePath} was deleted`);
      });

      return;
    } catch (error) {
      throw new RpcException({
        error: error.response.error,
        message: error.response.message,
        status: HttpStatus.NOT_FOUND
      });
    }

  }

}
