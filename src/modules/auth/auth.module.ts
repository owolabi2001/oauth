import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { GoogleStrategy } from "./strategy";
import { AuthService } from "./services";
import { UserModule } from "../user";
import { SessionSerializer } from "./serializer";

@Module({
    imports: [UserModule],
    controllers: [AuthController],
    providers: [
        GoogleStrategy,
        SessionSerializer,
        {
            provide: 'AUTH_SERVICE',
            useClass: AuthService
        }
    ]
})
export class AuthModule { }