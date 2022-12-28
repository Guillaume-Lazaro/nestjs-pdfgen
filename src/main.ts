import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

const port = process.env.PORT;

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.setBaseViewsDir('templates');
  app.setViewEngine('pug');   // Moteur de rendu pour la balise @Render
  await app.listen(3000);
}
bootstrap();
