import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SummaryModule } from './summary/summary.module';
import { Summary } from './summary/summary.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env/.development.env'
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port : 3306,
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
