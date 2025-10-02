import 'reflect-metadata';
import * as dotenv from 'dotenv';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './infra/typeorm/typeorm.config';
import { TablesModule } from './modules/tables/tables.module';
import { PlayersModule } from './modules/players/players.module';

dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => typeOrmConfig(),
    }),
    TablesModule,
    PlayersModule,
  ],
})
export class AppModule {} 