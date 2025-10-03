import 'reflect-metadata';
import { DataSource } from 'typeorm';
import appConfig from '@config/app.config';
import { TableOrmEntity } from './entities/table.orm-entity';
import { PlayerOrmEntity } from './entities/player.orm-entity';

const cfg = appConfig();

export default new DataSource({
  type: 'postgres',
  host: cfg.database.host,
  port: cfg.database.port,
  username: cfg.database.user,
  password: cfg.database.password,
  database: cfg.database.database,
  entities: [TableOrmEntity, PlayerOrmEntity],
  migrations: [`${cfg.typeorm.migrationsDir}/*.{ts,js}`],
  logging: cfg.typeorm.logging,
  synchronize: cfg.typeorm.synchronize,
}); 