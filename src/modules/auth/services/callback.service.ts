import { Injectable } from "@nestjs/common";
import { GenerateTokenService } from "./generate-token.service";
import { User } from "@prisma/client";

@Injectable()
export class CallbackService {
    constructor(
        private generateTokenService: GenerateTokenService
    ) { }

    async execute(res: any) {
        const user: User = res.user;

        const token = await this.generateTokenService.execute(
            user.firstName,
            user.lastName,
            user.email,
            user.id
        )

        return {
            fistName: user.firstName,
            lastName: user.lastName,
            id: user.id,
            picture: user.profilePicture,
            token
        }
    }
}