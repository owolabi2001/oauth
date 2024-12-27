import { Injectable, Logger } from "@nestjs/common";
import { PrismaService } from "src/database";

@Injectable()
export class GetUserService {
    private readonly logger = new Logger(GetUserService.name)
    constructor(
        private databaseService: PrismaService
    ) { }

    async query(email: string) {
        const user = await this.databaseService.user.findUnique({ where: { email } });
        this.logger.log('retrieved user details')
        return user;
    }

    async exist(email: string) {
        return !!(await this.databaseService.user.count({ where: { email } }));
    }

}