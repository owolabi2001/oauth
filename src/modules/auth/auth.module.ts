import { Module } from "@nestjs/common";
import { GoogleStrategy, JwtStrategy } from "./strategy";
import { AuthController } from "./auth.controller";
import { CallbackService, GenerateTokenService } from "./services";
import { JwtModule } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { EnvironmentConstants } from "src/common";
import { UserModule } from "../user";
import { PassportModule } from "@nestjs/passport";

@Module({
    imports: [
        PassportModule,
        UserModule,
        JwtModule.registerAsync({
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => {
                return {
                    secret: configService.get<string>(EnvironmentConstants.jwtSecret),
                    signOptions: { expiresIn: '7d' },
                    global: true
                }
            }
        })
    ],
    providers: [
        GoogleStrategy,
        GenerateTokenService,
        CallbackService,
        JwtStrategy
    ],
    controllers: [AuthController]
})
export class AuthModule { }