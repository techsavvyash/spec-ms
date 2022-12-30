import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3001);
//  DONT CHANGE THE PORT NUMBER IT SHOULD BE 3001 ALWAYS
}
bootstrap();
