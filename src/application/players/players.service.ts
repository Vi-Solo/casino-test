import { Inject, Injectable } from '@nestjs/common';
import { PlayerRepository } from '@domain/player/player.repository';
import { Player } from '@domain/player/player';
import { Page, PageRequest } from '@domain/shared/pagination';
import { TOKENS } from '@domain/shared/tokens';
import { NotFoundError, ValidationError } from '@domain/shared/errors';
import { TableRepository } from '@domain/table/table.repository';

@Injectable()
export class PlayersService {
  constructor(
    @Inject(TOKENS.PlayerRepository)
    private readonly playerRepo: PlayerRepository,
    @Inject(TOKENS.TableRepository)
    private readonly tableRepo: TableRepository,
  ) {}

  async create(input: Omit<Player, 'id'>): Promise<Player> {
    const table = await this.tableRepo.findById(input.tableId);
    if (!table) throw new ValidationError('Table does not exist');
    return this.playerRepo.create(input);
  }

  async getById(id: string): Promise<Player> {
    const player = await this.playerRepo.findById(id);
    if (!player) throw new NotFoundError('Player not found');
    return player;
  }

  async list(page: PageRequest): Promise<Page<Player>> {
    return this.playerRepo.list(page);
  }

  async listByTableId(tableId: string, page: PageRequest): Promise<Page<Player>> {
    const table = await this.tableRepo.findById(tableId);
    if (!table) throw new NotFoundError('Table not found');
    return this.playerRepo.listByTableId(tableId, page);
  }

  async update(
    id: string,
    updates: Partial<Omit<Player, 'id' | 'tableId'>> & { tableId?: string },
  ): Promise<Player> {
    if (updates.tableId) {
      const table = await this.tableRepo.findById(updates.tableId);
      if (!table) throw new ValidationError('Table does not exist');
    }
    return this.playerRepo.update(id, updates);
  }

  async delete(id: string): Promise<void> {
    return this.playerRepo.delete(id);
  }
} 