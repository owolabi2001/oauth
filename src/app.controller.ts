import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthUser } from './common';
import { User } from '@prisma/client';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  @ApiBearerAuth()
  getHello(@AuthUser() user: User): string {
    return this.appService.getHello();
  }
}
