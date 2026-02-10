import { Controller, Get, UseGuards } from '@nestjs/common';
import { ParticipantTypeService } from './participant-type.service';
import { JwtRs256Guard } from '../auth/jwt-auth.guard';
import { PermissionsGuard } from '../authorization/permission.guard';

@UseGuards(JwtRs256Guard, PermissionsGuard)
@Controller('participant-type')
export class ParticipantTypeController {
  constructor(private readonly participantTypeService: ParticipantTypeService) {}

  @Get()
  async getparticipantTypes(
  ) {
    return await this.participantTypeService.findAll()
  }
}
