import { Module } from '@nestjs/common';
import { RolesModule } from './modules/roles/roles.module';
import { PermissionsModule } from './modules/permissions/permissions.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { CoreModule } from './modules/core/core.module';
import { InfraModule } from './modules/infra/infra.module';
import { DatabaseModule } from './modules/database/database.module';
import { JwksModule } from './modules/jwks/jwks.module';

@Module({
  imports: [
    DatabaseModule,
    CoreModule,
    InfraModule,
    PermissionsModule,
    RolesModule,
    AuthModule,
    UsersModule,
    JwksModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
