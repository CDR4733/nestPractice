import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configration을 이용해서 .env 활용해보기!
  const configService = app.get(ConfigService);
  const PORT = configService.get<number>('SERVER_PORT');

  // Global하게 모든 엔드포인트 앞에 '/api' 를 붙인다
  app.setGlobalPrefix('api');

  // Validation Pipe 적용하기
  app.useGlobalPipes(
    new ValidationPipe({
      // transform: 자동으로 타입 변경
      transform: true,
      // whitelist: Validator가 검사대상자의 '데코레이터가 없는 프로퍼티'를 모두 제거
      whitelist: true,
      // forbidNonWhitelisted: 위 설정이 프로퍼티를 제거하면서 에러를 던지도록 설정
      forbidNonWhitelisted: true,
    }),
  );

  // Swagger 적용하기
  const config = new DocumentBuilder()
    .setTitle('NestJS Practice')
    .setDescription('NestJS Practice with ModoLee')
    .setVersion('1.0')
    .addTag('NestJS')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // PORT 실행
  await app.listen(PORT);
}
bootstrap();
