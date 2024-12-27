import { Injectable, Logger } from "@nestjs/common";
import { UserDetails } from "./types";
import { PrismaService } from "src/database";
import { GetUserService } from "src/modules/user/services";
import { User } from "@prisma/client";

@Injectable()
export class AuthService {
    private readonly logger = new Logger(AuthService.name)
    constructor(
        private databaseService: PrismaService,
        private getUserService: GetUserService
    ) { }
    async validateUser(details: UserDetails) {
        const { email } = details;
        this.logger.log(details);
        const userCheck = await this.getUserService.query(email);
        console.log("🚀 ~ AuthService ~ validateUser ~ userCheck:", userCheck)

        if (userCheck) {
            // in the natural situation you should update the user and then return the user
            return userCheck;
        }

        const newUser: User = await this.databaseService.user.create({
            data: { ...details }
        })

        this.logger.log(`new User was created`)
        return newUser;
    }

    async findUser(id: string): Promise<User> {
        return await this.databaseService.user.findUnique({ where: { id: id } })
    }
}