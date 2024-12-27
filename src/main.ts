import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggingInterceptor, TransformInterceptor } from './common';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerDocumentOptions, SwaggerModule } from '@nestjs/swagger';
import { EnvironmentConstants } from './common/constants';
import * as passport from 'passport'
import * as session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/v1');
  app.useGlobalInterceptors(new LoggingInterceptor());
  app.useGlobalInterceptors(new TransformInterceptor());
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true
    }),
  );
  app.use(
    session({
      secret: 'my-secret-should-be-from-env-tho',
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 60000,
      }
    }),
  );

  app.use(passport.initialize())
  app.use(passport.session())
  const configService = app.get(ConfigService);
  const logger = new Logger();

  const config = new DocumentBuilder()
    .setTitle('Oauth set-up')
    .setDescription('Oauth documentation')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const options: SwaggerDocumentOptions = {
    operationIdFactory: (c: string, method: string) => method,
    ignoreGlobalPrefix: false,
  };


  const document = SwaggerModule.createDocument(app, config, options);

  SwaggerModule.setup('swagger', app, document, {
    swaggerOptions: {
      displayOperationId: true,
      persistAuthorization: true
    },
    jsonDocumentUrl: 'swagger/json'
  });

  const port = configService.get<number>(EnvironmentConstants.port) ?? 3000
  await app.listen(port, () => logger.log(`App Running on port ${port}`));

}
bootstrap();
