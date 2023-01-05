import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
// import express from 'express';

const port = process.env.PORT;

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.setBaseViewsDir('templates');
  app.setViewEngine('pug');   // Moteur de rendu pour la balise @Render

  // let path = join('./', '..', 'public');
  // let truc = express.static(path)
  // app.use('/public', truc);
  await app.listen(3000);
}
bootstrap();
