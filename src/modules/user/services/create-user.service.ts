import { ConflictException, Injectable, Logger } from "@nestjs/common";
import { PrismaService } from "src/database/services";
import { CreateUserDto } from "../dto";
import { GetUserService } from "./get-user.service";
import * as argon2 from "argon2"

@Injectable()
export class CreateUserService {
    private readonly logger = new Logger(CreateUserService.name)
    constructor(
        private databaseService: PrismaService,
        private readonly getUserService: GetUserService
    ) { }

    async execute(data: CreateUserDto) {
        this.logger.log(`Retrieved request to create user`)
        const { email, firstName, lastName, password } = data;

        if (await this.getUserService.exist(email)) {
            this.logger.warn(`user with email already exist`);
            throw new ConflictException(`User with this email already exist`);
        }
        const createdUser = await this.databaseService.user.create({
            data: {
                firstName,
                lastName,
                email,
                password: await argon2.hash(password)
            }
        });

        this.logger.log(`User successfully created`);

        return {
            message: 'user successfully created',
            id: createdUser.id
        }
    }
}