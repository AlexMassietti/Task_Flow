import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  // Microservicio TCP principal (puerto 4003)
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: { 
        host: '0.0.0.0',
        port: 4003 
      },
    },
  );

  // HTTP Gateway para Swagger y testing (puerto 3002)
  await app.listen();
  
  // Crear app HTTP para Swagger
  const httpApp = await NestFactory.create(AppModule);
  
  httpApp.connectMicroservice({
    transport: Transport.TCP,
    options: { host: 'localhost', port: 4003 },
  });

  // Pipes globales
  httpApp.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  // Swagger configuración
  const config = new DocumentBuilder()
    .setTitle('Microservicio de Mail')
    .setDescription('API para envío de emails y reset de contraseñas')
    .setVersion('0.1')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'Authorization',
        in: 'header',
        description: 'Ingresa el token JWT',
      },
      'Bearer',
    )
    .build();

  const documentFactory = () => SwaggerModule.createDocument(httpApp, config);
  SwaggerModule.setup('api', httpApp, documentFactory);

  // Iniciar microservicio y HTTP
  await httpApp.startAllMicroservices();
  await httpApp.listen(3003);

  Logger.log('✅ Mail microservice TCP listening on port 4003');
  Logger.log('🚀 Mail HTTP API + Swagger on: http://localhost:3003/api');
}

bootstrap();
