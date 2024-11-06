import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SummaryModule } from './summary/summary.module';
import { Summary } from './summary/summary.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      // 개발환경에서는 .development.env 파일을 사용
      // 배포환경에서는 .release.env 파일을 사용
      // envFilePath: '.env/.development.env'
      envFilePath: '.env/.release.env'
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port : Number(process.env.DB_PORT),
      username : process.env.DB_USERNAME,
      password : process.env.DB_PASSWORD,
      database : process.env.DB_SCHEMA,
      entities: [Summary],
      synchronize: false
    }),
    
    SummaryModule
  ],
})
export class AppModule {
}
