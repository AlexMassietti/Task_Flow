import { ClientProviderOptions, Transport } from '@nestjs/microservices';

export const API_GATEWAY_SERVICE: ClientProviderOptions = {
  name: 'API_GATEWAY_SERVICE',
  transport: Transport.TCP,
  options: {
    host: '0.0.0.0',   
    port: 3002,
  },
};
