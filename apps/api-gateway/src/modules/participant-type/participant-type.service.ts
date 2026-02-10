import { HttpException, Inject, Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { normalizeRemoteError } from '../auth/error/normalize-remote-error';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class ParticipantTypeService {
    constructor(
        @Inject('DASHBOARD_SERVICE') private readonly dashboardClient: ClientProxy,
    ) { }
async findAll() {
    try{
      const priority = await firstValueFrom(this.dashboardClient.send({ cmd: 'get_participant_types'}, {}));
      return priority;
    }catch (err: unknown) {
      const payload = normalizeRemoteError(err);
      throw new HttpException(
        { error: payload },
        typeof payload.status === 'number' ? payload.status : 500,
      );
    }
  }
}
