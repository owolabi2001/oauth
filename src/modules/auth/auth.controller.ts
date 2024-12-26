import { Controller, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('auth')
@Controller('auth')
export class AuthController {

    @Get('google/login')
    handleLogin() {
        // this method redirects user to the google oauth screen

    }

    @Get('google/redirect')
    handleRedirect() {

    }
} 