import { Module } from "@nestjs/common";
import { TaskService } from "./task.service";
import { AuthModule } from "../auth/auth.module";
import { ClientsModule } from "@nestjs/microservices";
import { DASHBOARD_SERVICE } from "@api-gateway/config/microservice.config";
import { TaskController } from "./task.controller";

@Module({
    imports: [ClientsModule.register([DASHBOARD_SERVICE]), AuthModule],
    controllers: [TaskController],
    providers: [TaskService],
    exports: [],
})
export class TaskModule { }