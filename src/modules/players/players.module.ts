import { Module } from '@nestjs/common';
import { PlayersController } from '../../interfaces/http/controllers/players.controller';
import { PlayersService } from '../../application/players/players.service';
import { PersistenceModule } from '../../infra/typeorm/persistence.module';

@Module({
  imports: [PersistenceModule],
  controllers: [PlayersController],
  providers: [PlayersService],
})
export class PlayersModule {} 