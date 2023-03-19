import { Logger, ValidationPipe } from '@nestjs/common';

import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { env } from 'api/environment';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger();

  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'error', 'verbose'],
  });
  const port = Number(env.PORT);

  const config = new DocumentBuilder()
    .setTitle('Lern API')
    .setVersion('1.0')
    .build();

  app.useGlobalPipes(new ValidationPipe());

  // add swagger
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);
  // microservices

  await app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.REDIS,
    options: {
      host: env.REDIS_URL,
      port: Number(env.REDIS_PORT),
    },
  });

  app.startAllMicroservices();

  await app.listen(port);

  logger.log(`Application listening on port ${port}`);
}

bootstrap();
