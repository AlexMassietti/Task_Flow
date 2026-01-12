import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path'; // Importante
import { configuration } from '../../config/configuration';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [configuration],
            envFilePath: [
                // 1. Ruta relativa a la raíz del proyecto (donde sueles estar parado)
                join(process.cwd(), 'apps/microservice-tasks/config/env/development.env'),
                // 2. Ruta alternativa por si el proceso inició desde dentro de la carpeta del app
                join(process.cwd(), 'config/env/development.env'),
                // 3. Fallback a la raíz por si acaso
                '.env'
            ],
            expandVariables: true,
        }),
        TypeOrmModule.forRootAsync({
            inject: [ConfigService],
            useFactory: (config: ConfigService) => {
                // Debug interno de Nest para estar 100% seguros
                const pass = config.get<string>('DB_PASSWORD');
                
                return {
                    type: 'postgres',
                    host: config.get<string>('DB_HOST'),
                    port: config.get<number>('DB_PORT'),
                    username: config.get<string>('DB_USERNAME'),
                    password: pass,
                    database: config.get<string>('DB_DATABASE'),
                    autoLoadEntities: true,
                    synchronize: true,
                };
            },
        }),
    ],
    exports: [TypeOrmModule],
})
export class DatabaseModule { }