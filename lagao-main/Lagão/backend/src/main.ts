import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors()

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // Remove dados que não estão no DTO
    forbidNonWhitelisted: true, // Retorna erro se enviarem dados extras
    transform: true, // Converte tipos automaticamente (ex: string "1" vira number 1)
  }));

  const config = new DocumentBuilder()
    .setTitle('Lagao - Backend')
    .setDescription('APIs do Lagao')
    .setVersion('1.0')
    .addTag('lagao')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, documentFactory);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
