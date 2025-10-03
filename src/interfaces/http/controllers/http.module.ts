import { Module } from '@nestjs/common';
import { PlayersHttpModule } from './players/players.http.module';
import { TablesHttpModule } from './tables/tables.http.module';
import { APP_FILTER } from '@nestjs/core';
import { DomainExceptionFilter } from '@interfaces/http/filters/domain-exception.filter';

@Module({
  imports: [PlayersHttpModule, TablesHttpModule],
  providers: [
    {
      provide: APP_FILTER,
      useClass: DomainExceptionFilter,
    },
  ],
})
export class HttpModule {}


