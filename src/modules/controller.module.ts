import { Module } from "@nestjs/common";
import { UserModule } from "./user";
import { AuthModule } from "./auth";
import { APP_GUARD } from "@nestjs/core";
import { JwtAuthGuard } from "./auth/guard";

@Module({
    imports: [
        UserModule,
        AuthModule,
    ],
    providers: [
        {
            provide: APP_GUARD,
            useClass: JwtAuthGuard,
        }
    ]
})
export class ControllerModule { }