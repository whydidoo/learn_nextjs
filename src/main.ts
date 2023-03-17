import { Logger } from '@nestjs/common';

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger();

  console.log('start');
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'error', 'verbose'],
  });
  console.log(app);
  const port = process.env.PORT;

  await app.listen(port);

  logger.log(`Application listening on port ${port}`);
}

bootstrap();
