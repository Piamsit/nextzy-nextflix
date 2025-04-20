import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const isProd = configService.get('NODE_ENV') === 'production';
  // const frontendOrigin = configService.get<string>('FRONTEND_ORIGIN')?.split(',') ?? [];

  app.enableCors(
    // {
    //   origin: isProd ? frontendOrigin : true,
    //   credentials: true,
    // }
  );

  app.use(helmet());

  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  if (!isProd) {
    const swaggerConfig = new DocumentBuilder()
      .setTitle('API Docs')
      .setDescription('Generated Swagger API for development')
      .setVersion('1.0')
      .build();

    const document = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('api', app, document);

    app.getHttpAdapter().get('/swagger-spec.json', (req, res) => {
      res.header('Content-Type', 'application/json');
      res.send(document);
    });
  }

  const port = configService.get<number>('PORT') || 3001;
  await app.listen(port);

  console.log(`🚀 App is running on: http://localhost:${port}/api`);
  if (!isProd) {
    console.log(`📚 Swagger UI available at: http://localhost:${port}/api-docs`);
    console.log(`🔗 Swagger JSON available at: http://localhost:${port}/swagger-spec.json`);
  }
}

bootstrap();
