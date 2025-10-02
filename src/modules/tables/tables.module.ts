import { Module } from '@nestjs/common';
import { TablesController } from '../../interfaces/http/controllers/tables.controller';
import { TablesService } from '../../application/tables/tables.service';
import { PersistenceModule } from '../../infra/typeorm/persistence.module';
import { PlayersService } from '../../application/players/players.service';

@Module({
  imports: [PersistenceModule],
  controllers: [TablesController],
  providers: [TablesService, PlayersService],
})
export class TablesModule {} 