import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { TableOrmEntity } from './entities/table.orm-entity';
import { PlayerOrmEntity } from './entities/player.orm-entity';
import appConfig from '@config/app.config';

export function typeOrmConfig(): TypeOrmModuleOptions {
  const cfg = appConfig();
  return {
    type: 'postgres',
    host: cfg.database.host,
    port: cfg.database.port,
    username: cfg.database.user,
    password: cfg.database.password,
    database: cfg.database.database,
    entities: [TableOrmEntity, PlayerOrmEntity],
    synchronize: cfg.typeorm.synchronize,
    migrations: [`${cfg.typeorm.migrationsDir}/*.{ts,js}`],
    logging: cfg.typeorm.logging,
  };
} 