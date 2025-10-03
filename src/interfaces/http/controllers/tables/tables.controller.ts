import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, Query } from '@nestjs/common';
import { TablesService } from '@application/tables/tables.service';
import { CreateTableDto, UpdateTableDto } from '@interfaces/http/dto/table.dto';
import { PaginationDto } from '@interfaces/http/dto/pagination.dto';
import { PlayersService } from '@application/players/players.service';

@Controller('tables')
export class TablesController {
  constructor(
    private readonly tablesService: TablesService,
    private readonly playersService: PlayersService,
  ) {}

  @Post()
  create(@Body() dto: CreateTableDto) {
    return this.tablesService.create({ name: dto.name });
  }

  @Get()
  list(@Query() { limit, offset }: PaginationDto) {
    return this.tablesService.list({ limit, offset });
  }

  @Get(':id')
  get(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.tablesService.getById(id);
  }

  @Patch(':id')
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() dto: UpdateTableDto,
  ) {
    return this.tablesService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.tablesService.delete(id);
  }

  @Get(':id/players')
  listPlayers(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Query() { limit, offset }: PaginationDto,
  ) {
    return this.playersService.listByTableId(id, { limit, offset });
  }
} 