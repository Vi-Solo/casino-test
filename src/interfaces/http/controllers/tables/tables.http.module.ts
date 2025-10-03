import { Module } from '@nestjs/common';
import { TablesController } from './tables.controller';
import { TablesModule as TablesAppModule } from '@application/tables/tables.module';
import { PlayersModule as PlayersAppModule } from '@application/players/players.module';

@Module({
  imports: [TablesAppModule, PlayersAppModule],
  controllers: [TablesController],
})
export class TablesHttpModule {}
