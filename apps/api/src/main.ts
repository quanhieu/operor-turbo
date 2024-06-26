import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  // config swagger
  const config = new DocumentBuilder()
    .setTitle('')
    .setDescription('')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const port = process.env.APP_PORT || process.env.PORT || 8081;
  const hostname = process.env.APP_HOST || '0.0.0.0';
  await app.listen(port, hostname, () => {
    console.log(`Server running on http://${hostname}:${port}`, 'Bootstrap');
  });
}
bootstrap();
