import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Profile, Strategy, VerifyCallback } from "passport-google-oauth20";
import { EnvironmentConstants } from "src/common";
import { PrismaService } from "src/database";
import { GetUserService } from "src/modules/user";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
    private readonly logger = new Logger(GoogleStrategy.name);

    constructor(
        configService: ConfigService,
        private readonly getUserService: GetUserService,
        private readonly databaseService: PrismaService
    ) {
        super({
            clientID: configService.get(EnvironmentConstants.clientId),
            clientSecret: configService.get(EnvironmentConstants.clientSecret),
            callbackURL: 'http://localhost:6060/api/v1/auth/google/callback',
            scope: ['email', 'profile'],
        })
    }

    async validate(
        accessToken: string,
        refreshToken: string,
        profile: Profile,
        done: VerifyCallback,): Promise<any> {
        this.logger.log(`Validating user method execution`);
        const { name, emails, photos } = profile

        const user = await this.databaseService.user.upsert({
            where: {
                email: emails[0].value
            },
            update: {
                firstName: name.givenName,
                lastName: name.familyName,
                profilePicture: photos[0].value,
                isActivated: emails[0].verified
            },
            create: {
                email: emails[0].value,
                firstName: name.givenName,
                lastName: name.familyName,
                profilePicture: photos[0].value,
                isActivated: emails[0].verified
            }
        })

        this.logger.log(`User successfully retrieved`)
        done(null, user);

    }
}