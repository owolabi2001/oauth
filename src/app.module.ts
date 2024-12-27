import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database';
import { ControllerModule } from './modules';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    ControllerModule,
    PassportModule.register({ session: true })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
