import 'reflect-metadata';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from '@infra/typeorm/typeorm.config';
import { HttpModule } from '@interfaces/http/controllers/http.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => typeOrmConfig(),
    }),
    HttpModule,
  ],
})
export class AppModule {} 