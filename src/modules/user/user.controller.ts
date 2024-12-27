import { Body, Controller, Get, Post, Req } from "@nestjs/common";
import { CreateUserDto } from "./dto";
import { ApiTags } from "@nestjs/swagger";
import { CreateUserService } from "./services";
import { Request } from "express";

@ApiTags('user')
@Controller('user')
export class UserController {
    constructor(
        private readonly createUserService: CreateUserService
    ) { }

    @Post()
    create(@Body() payload: CreateUserDto) {
        return this.createUserService.execute(payload)
    }

    @Get('status')
    getUser(@Req() req: Request) {
        console.log(req.user)
        if (req.user) {
            return { msg: "authenticated" }
        } else {
            return { msg: 'unauthenticated' }
        }
    }
}