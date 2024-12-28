import { Injectable, Logger } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class GenerateTokenService {
    private readonly logger = new Logger(GenerateTokenService.name)
    constructor(
        private jwtService: JwtService
    ) { }

    async execute(firstName: string, lastName: string, email: string, userId?: string): Promise<string> {
        const token = await this.jwtService.signAsync({
            firstName,
            lastName,
            email,
            userId
        });
        this.logger.log('Successfully generated token');
        return token;
    }
}