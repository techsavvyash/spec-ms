import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
        .setTitle('CQUBE')
        .setDescription('[ Base URL: /v0 ]')
        .setVersion('1.0.0')
        .build(); 
const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('api', app, document);
  await app.listen(3001);
//  DONT CHANGE THE PORT NUMBER IT SHOULD BE 3001 ALWAYS
}
bootstrap(); 
