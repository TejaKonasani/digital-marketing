import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Enterprise API Prefix
  app.setGlobalPrefix('api/v1');
  
  // CORS configuration for admin and client portals
  app.enableCors({
    origin: ['http://localhost:5173', 'http://localhost:5174'],
    credentials: true,
  });

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`Samrudhi Enterprise Backend running on port ${port}`);
}
bootstrap();
