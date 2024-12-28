import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { EnvironmentConstants } from "src/common";
import { GetUserService } from "src/modules/user";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    private readonly logger = new Logger(JwtStrategy.name)
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
        const { email, userId } = payload;
        this.logger.log(`Validating user with id: ${userId}`)
        //TODO: Cache user so you won't have to query the database on every request
        const user = await this.getUserService.query(email)
        return user;
    }
}