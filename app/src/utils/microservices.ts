import { ClientProxyFactory, Transport } from '@nestjs/microservices';

export const getWorker = () => ({
  provide: 'WORKER',
  useFactory: () =>
    ClientProxyFactory.create({
      transport: Transport.REDIS,
      options: {
        host: process.env.REDIS_URL,
        port: Number(process.env.REDIS_PORT),
      },
    }),
});
