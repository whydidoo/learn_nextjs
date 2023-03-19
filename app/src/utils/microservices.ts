import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { env } from 'environment';

export const getWorker = () => ({
  provide: 'WORKER',
  useFactory: () =>
    ClientProxyFactory.create({
      transport: Transport.REDIS,
      options: {
        host: env.REDIS_URL,
        port: Number(env.REDIS_PORT),
      },
    }),
});
