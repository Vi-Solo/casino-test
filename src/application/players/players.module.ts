import { Module } from '@nestjs/common';
import { PersistenceModule } from '@infra/typeorm/persistence.module';
import { PlayersService } from './players.service';

@Module({
  imports: [PersistenceModule],
  providers: [PlayersService],
  exports: [PlayersService],
})
export class PlayersModule {}


