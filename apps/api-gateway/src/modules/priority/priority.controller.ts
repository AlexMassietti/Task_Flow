import { Controller, Get, UseGuards} from '@nestjs/common';
import { PriorityService } from './priority.service';
import { JwtRs256Guard } from '../auth/jwt-auth.guard';
import { PermissionsGuard } from '../authorization/permission.guard';

@UseGuards(JwtRs256Guard, PermissionsGuard)
@Controller('priorities')
export class PriorityController {
  constructor(private readonly priorityService: PriorityService) {}

  @Get()
  findAll() {
    return this.priorityService.findAll();
  }

}
