// app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InfraModule } from './infra/infra.module';
import { NotificationModule } from './notification/notification.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5433, // El puerto de tu Docker/Postgres
      username: 'admin',
      password: 'admin',
      database: 'NotificationDatabase',
      autoLoadEntities: true, 
      synchronize: true, 
    }),
    InfraModule,
    NotificationModule,
  ],
})
export class AppModule {}