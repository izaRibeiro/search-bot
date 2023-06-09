import { ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  ConfigModule.forRoot({
    envFilePath: '.env',
  });

  const config = new DocumentBuilder()
    .setTitle('Search Boot')
    .setDescription(
      'Boot focused on looking for personalized information according to your preferred date',
    )
         .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  
  app.enableCors({origin: process.env.CORS_ORIGIN});
    
  await app.listen(process.env.PORT);
}
bootstrap();
