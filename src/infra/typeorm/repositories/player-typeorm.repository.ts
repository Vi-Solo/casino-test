import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PlayerRepository } from '@domain/player/player.repository';
import { Player } from '@domain/player/player';
import { PlayerOrmEntity } from '../entities/player.orm-entity';
import { Page, PageRequest } from '@domain/shared/pagination';
import { ConflictError, NotFoundError } from '@domain/shared/errors';

const PG_UNIQUE_VIOLATION = '23505';

function toDomain(entity: PlayerOrmEntity): Player {
  return { id: entity.id, name: entity.name, email: entity.email, tableId: entity.tableId };
}

export class PlayerTypeOrmRepository implements PlayerRepository {
  constructor(
    @InjectRepository(PlayerOrmEntity)
    private readonly repo: Repository<PlayerOrmEntity>,
  ) {}

  async create(player: Omit<Player, 'id'>): Promise<Player> {
    try {
      const created = this.repo.create({ name: player.name, email: player.email, tableId: player.tableId });
      const saved = await this.repo.save(created);
      return toDomain(saved);
    } catch (e: any) {
      if (e?.code === PG_UNIQUE_VIOLATION) {
        const detail: string = e?.detail ?? '';
        if (detail.includes('(email)')) {
          throw new ConflictError('Email already exists');
        }
        if (detail.includes('(name, tableId)')) {
          throw new ConflictError('Player with this name already exists in the table');
        }
        throw new ConflictError('Unique constraint violation');
      }
      throw e;
    }
  }

  async findById(id: string): Promise<Player | null> {
    const found = await this.repo.findOne({ where: { id } });
    return found ? toDomain(found) : null;
  }

  async findByNameAndTableId(name: string, tableId: string): Promise<Player | null> {
    const found = await this.repo.findOne({ where: { name, tableId } });
    return found ? toDomain(found) : null;
  }

  async list(page: PageRequest): Promise<Page<Player>> {
    const [rows, total] = await this.repo.findAndCount({
      take: page.limit,
      skip: page.offset,
      order: { name: 'ASC', id: 'ASC' },
    });
    return { items: rows.map(toDomain), total, limit: page.limit, offset: page.offset };
  }

  async listByTableId(tableId: string, page: PageRequest): Promise<Page<Player>> {
    const [rows, total] = await this.repo.findAndCount({
      where: { tableId },
      take: page.limit,
      skip: page.offset,
      order: { name: 'ASC', id: 'ASC' },
    });
    return { items: rows.map(toDomain), total, limit: page.limit, offset: page.offset };
  }

  async update(
    id: string,
    updates: Partial<Omit<Player, 'id' | 'tableId'>> & { tableId?: string },
  ): Promise<Player> {
    try {
      const result = await this.repo.update({ id }, { ...updates });
      if (result.affected === 0) throw new NotFoundError('Player not found');
      const updated = await this.repo.findOneOrFail({ where: { id } });
      return toDomain(updated);
    } catch (e: any) {
      if (e?.code === PG_UNIQUE_VIOLATION) {
        const detail: string = e?.detail ?? '';
        if (detail.includes('(email)')) {
          throw new ConflictError('Email already exists');
        }
        if (detail.includes('(name, tableId)')) {
          throw new ConflictError('Player with this name already exists in the table');
        }
        throw new ConflictError('Unique constraint violation');
      }
      throw e;
    }
  }

  async delete(id: string): Promise<void> {
    const result = await this.repo.delete({ id });
    if (result.affected === 0) throw new NotFoundError('Player not found');
  }
} 