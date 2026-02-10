import { Controller, Get, UseGuards } from '@nestjs/common';
import { StatusService } from './status.service';
import { PermissionsGuard } from '../authorization/permission.guard';
import { JwtRs256Guard } from '../auth/jwt-auth.guard';

@UseGuards(JwtRs256Guard, PermissionsGuard)
@Controller('statuses')
export class StatusController {
  constructor(private readonly statusService: StatusService) {}

  @Get()
  findAll() {
    return this.statusService.findAll();
  }

}
