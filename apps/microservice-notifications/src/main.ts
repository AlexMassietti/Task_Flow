import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice({
    transport: Transport.TCP,
    options: { host : '0.0.0.0',port: 4004 },
  });

  // Configuración de Swagger
  const config = new DocumentBuilder()
    .setTitle('API de Notificaciones')
    .setDescription('Documentación de la API para notificaciones')
    .setVersion('1.0')
    .addTag('Tasks')
    .addTag('Priorities')
    .addTag('Statuses')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // Ruta: http://localhost:3004/api

  await app.startAllMicroservices();
  await app.listen(3004);
}
bootstrap();
