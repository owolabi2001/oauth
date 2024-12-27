import { Inject, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Profile, Strategy } from "passport-google-oauth20";
import { EnvironmentConstants } from "src/common";
import { AuthService } from "../services";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
    constructor(
        configService: ConfigService,
        @Inject('AUTH_SERVICE') private readonly authService: AuthService
    ) {
        super({
            clientID: configService.get(EnvironmentConstants.clientId),
            clientSecret: configService.get(EnvironmentConstants.clientSecret),
            callbackURL: 'http://localhost:6060/api/v1/auth/google/callback',
            scope: ['profile', 'email']
        })
    }

    async validate(accessToken: string, refreshToken: string, profile: Profile) {
        console.log("🚀 ~ GoogleStrategy ~ validate ~ profile:", profile)
        console.log("🚀 ~ GoogleStrategy ~ validate ~ refreshToken:", refreshToken)
        console.log("🚀 ~ GoogleStrategy ~ classGoogleStrategyextendsPassportStrategy ~ accessToken:", accessToken)
        const user = await this.authService.validateUser(
            {
                email: profile.emails[0].value,
                displayName: profile.displayName,
                lastName: profile.name.familyName,
                firstName: profile.name.givenName
            })
        console.log('validate');
        console.log()
        return user || null
    }
}  