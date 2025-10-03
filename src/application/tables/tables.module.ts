import { Module } from '@nestjs/common';
import { PersistenceModule } from '@infra/typeorm/persistence.module';
import { TablesService } from './tables.service';

@Module({
  imports: [PersistenceModule],
  providers: [TablesService],
  exports: [TablesService],
})
export class TablesModule {}


