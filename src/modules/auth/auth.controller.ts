import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { GoogleGuard } from "./guard";
import { CallbackService, GenerateTokenService } from "./services";

@Controller('auth')
export class AuthController {
    constructor(
        private readonly callbackService: CallbackService
    ) { }

    @Get('google/login')
    @UseGuards(GoogleGuard)
    oauthLogin() {

    }

    @Get('google/callback')
    @UseGuards(GoogleGuard)
    async oauthCallback(@Req() res: any) {
        return this.callbackService.execute(res)
    }
}