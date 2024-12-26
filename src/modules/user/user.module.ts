import { Module } from "@nestjs/common";
import { CreateUserService, GetUserService } from "./services";
import { UserController } from "./user.controller";

@Module({
    providers: [
        CreateUserService,
        GetUserService
    ],
    controllers: [UserController]
})
export class UserModule { }