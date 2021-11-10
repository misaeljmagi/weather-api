import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder().setTitle('Weather App').build();

  SwaggerModule.setup('/docs', app, SwaggerModule.createDocument(app, options));

  await app.listen(3000);
}
bootstrap();
