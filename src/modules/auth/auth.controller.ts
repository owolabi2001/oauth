import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { GoogleGuard } from "./guard";
import { CallbackService, GenerateTokenService } from "./services";
import { ApiTags } from "@nestjs/swagger";
import { Public } from "src/common";

@Controller('auth')
@ApiTags('auth')
export class AuthController {
    constructor(
        private readonly callbackService: CallbackService
    ) { }

    @Public()
    @Get('google/login')
    @UseGuards(GoogleGuard)
    oauthLogin() {

    }

    @Public()
    @Get('google/callback')
    @UseGuards(GoogleGuard)
    async oauthCallback(@Req() res: any) {
        return this.callbackService.execute(res)
    }
}