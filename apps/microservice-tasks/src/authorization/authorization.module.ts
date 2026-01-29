import { Module } from '@nestjs/common';
import { AuthorizationService } from './authorization.service';
import { InfraModule } from '@microservice-tasks/infra/infra.module';

@Module({
  imports: [InfraModule], 
  providers: [AuthorizationService],
  exports: [AuthorizationService],
})
export class AuthorizationModule {}
