import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, Query } from '@nestjs/common';
import { PlayersService } from '../../../application/players/players.service';
import { CreatePlayerDto, UpdatePlayerDto } from '../dto/player.dto';
import { PaginationDto } from '../dto/pagination.dto';

@Controller('players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Post()
  create(@Body() dto: CreatePlayerDto) {
    return this.playersService.create({ name: dto.name, tableId: dto.tableId });
  }

  @Get()
  list(@Query() { limit, offset }: PaginationDto) {
    return this.playersService.list({ limit, offset });
  }

  @Get(':id')
  get(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.playersService.getById(id);
  }

  @Patch(':id')
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() dto: UpdatePlayerDto,
  ) {
    return this.playersService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.playersService.delete(id);
  }
} 