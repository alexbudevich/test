import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
    cors: true,
  });
  app.enableCors({
    origin: '*',
  });
  const config = new DocumentBuilder()
    .setTitle('Betting')
    .setDescription('The description of Betting Core APIs')
    .addBearerAuth()
    .setVersion('0.1')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}

bootstrap();
