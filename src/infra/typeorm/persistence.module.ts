import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TableOrmEntity } from './entities/table.orm-entity';
import { PlayerOrmEntity } from './entities/player.orm-entity';
import { TOKENS } from '../../domain/shared/tokens';
import { TableTypeOrmRepository } from './repositories/table-typeorm.repository';
import { PlayerTypeOrmRepository } from './repositories/player-typeorm.repository';

@Module({
  imports: [TypeOrmModule.forFeature([TableOrmEntity, PlayerOrmEntity])],
  providers: [
    { provide: TOKENS.TableRepository, useClass: TableTypeOrmRepository },
    { provide: TOKENS.PlayerRepository, useClass: PlayerTypeOrmRepository },
  ],
  exports: [TOKENS.TableRepository, TOKENS.PlayerRepository],
})
export class PersistenceModule {} 