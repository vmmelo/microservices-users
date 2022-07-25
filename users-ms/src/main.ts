import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const port = parseInt(process.env.HTTP_PORT) || 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(port);
}

bootstrap().then(() => console.log(`Server running on port ${port}`));
