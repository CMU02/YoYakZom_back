import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SummaryModule } from './summary/summary.module';
import { Summary } from './summary/summary.entity';

@Module({
  imports: [
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
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
