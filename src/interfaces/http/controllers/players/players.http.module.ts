import { Module } from '@nestjs/common';
import { PlayersController } from './players.controller';
import { PlayersModule as PlayersAppModule } from '@application/players/players.module';

@Module({
  imports: [PlayersAppModule],
  controllers: [PlayersController],
})
export class PlayersHttpModule {}


