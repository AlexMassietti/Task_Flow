import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Transport } from '@nestjs/microservices';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  
  // Conexión al microservicio
  app.connectMicroservice({
    transport: Transport.TCP,
    options: { host: '0.0.0.0', port: 4000 },
  });

  // Configurar servicio de archivos estáticos
  app.useStaticAssets(join(__dirname, '..', 'static'), {
    prefix: '/static/',
  });

  // Habilitar CORS si es necesario
  app.enableCors();

  // Configuración de Swagger
  const config = new DocumentBuilder()
    .setTitle('API de Tareas')
    .setDescription('Documentación de la API para tareas, prioridades y estados')
    .setVersion('1.0')
    .addTag('Tasks')
    .addTag('Priorities')
    .addTag('Statuses')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // Ruta: http://localhost:3000/api
  
  await app.startAllMicroservices();
  await app.listen(3000);
}
bootstrap();