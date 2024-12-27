import { Controller, Get, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { GoogleAuthGuard } from "./guards";

@ApiTags('auth')
@Controller('auth')
export class AuthController {

    @Get('google/login')
    @UseGuards(GoogleAuthGuard)
    handleLogin() {
        // this method redirects user to the google oauth screen

    }

    @Get('google/callback')
    @UseGuards(GoogleAuthGuard)
    handleRedirect() {

    }
} 