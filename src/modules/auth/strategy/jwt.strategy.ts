import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { EnvironmentConstants } from "src/common";
import { GetUserService } from "src/modules/user";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(
        configService: ConfigService,
        private readonly getUserService: GetUserService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get(EnvironmentConstants.jwtSecret),
        });
    }

    async validate(payload: any) {
        const { email } = payload;
        //TODO: Cache user so you won't have to query the database on every request
        const user = await this.getUserService.query(email)
        return user;
    }
}