import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const corsOptions: CorsOptions = {
    origin: ['https://yoyakzom.com', 'https://www.yoyakzom.com', 'http://localhost:3000', 'http://localhost:5173'], // 허용할 출처 설정
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // 허용할 HTTP 메서드
    credentials: true, // 인증 정보(Cookies, Authorization 헤더 등) 허용
  };

  app.enableCors(corsOptions);

  await app.listen(process.env.PORT ?? 7002);
}
bootstrap();
