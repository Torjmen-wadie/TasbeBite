// src/main.ts

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors({origin:"http://localhost:3000"});
  app.useStaticAssets("upload",{prefix: "/upload"});
  const config = new DocumentBuilder()
    .setTitle('TasteBite')
    .setDescription('The TasteBite API description')
    .setVersion('0.1')
    .addApiKey({type:"apiKey",name:"Authorization", in:"header"},'nameAuthorization')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(4000);
}
bootstrap();