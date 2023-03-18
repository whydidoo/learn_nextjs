import { Logger, ValidationPipe } from '@nestjs/common';

import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger();

  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'error', 'verbose'],
  });
  const port = process.env.PORT;

  const config = new DocumentBuilder()
    .setTitle('Lern API')
    .setVersion('1.0')
    .build();

  app.useGlobalPipes(new ValidationPipe());

  // add swagger
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(port);

  logger.log(`Application listening on port ${port}`);
}

bootstrap();
