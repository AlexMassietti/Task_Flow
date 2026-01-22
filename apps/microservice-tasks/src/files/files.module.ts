import { Module } from '@nestjs/common';

import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { InfraModule } from '@microservice-tasks/infra/infra.module';

@Module({
  imports: [InfraModule],
  controllers: [FilesController],
  providers: [FilesService],
})
export class FilesModule { }
