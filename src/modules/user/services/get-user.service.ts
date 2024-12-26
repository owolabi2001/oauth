import { Injectable, Logger } from "@nestjs/common";
import { PrismaService } from "src/database";

@Injectable()
export class GetUserService {
    private readonly logger = new Logger(GetUserService.name)
    constructor(
        private databaseService: PrismaService
    ) { }

    async exist(email: string) {
        return !!(await this.databaseService.user.count({ where: { email } }));
    }

}