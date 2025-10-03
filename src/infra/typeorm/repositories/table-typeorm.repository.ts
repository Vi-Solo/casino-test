import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TableRepository } from '@domain/table/table.repository';
import { Table } from '@domain/table/table';
import { TableOrmEntity } from '../entities/table.orm-entity';
import { Page, PageRequest } from '@domain/shared/pagination';
import { ConflictError, NotFoundError } from '@domain/shared/errors';

const PG_UNIQUE_VIOLATION = '23505';

function toDomain(entity: TableOrmEntity): Table {
  return { id: entity.id, name: entity.name };
}

export class TableTypeOrmRepository implements TableRepository {
  constructor(
    @InjectRepository(TableOrmEntity)
    private readonly repo: Repository<TableOrmEntity>,
  ) {}

  async create(table: Omit<Table, 'id'>): Promise<Table> {
    try {
      const created = this.repo.create({ name: table.name });
      const saved = await this.repo.save(created);
      return toDomain(saved);
    } catch (e: any) {
      if (e?.code === PG_UNIQUE_VIOLATION) {
        throw new ConflictError('Table with this name already exists');
      }
      throw e;
    }
  }

  async findById(id: string): Promise<Table | null> {
    const found = await this.repo.findOne({ where: { id } });
    return found ? toDomain(found) : null;
  }

  async findByName(name: string): Promise<Table | null> {
    const found = await this.repo.findOne({ where: { name } });
    return found ? toDomain(found) : null;
  }

  async list(page: PageRequest): Promise<Page<Table>> {
    const [rows, total] = await this.repo.findAndCount({
      take: page.limit,
      skip: page.offset,
      order: { name: 'ASC' },
    });
    return { items: rows.map(toDomain), total, limit: page.limit, offset: page.offset };
  }

  async update(id: string, updates: Partial<Omit<Table, 'id'>>): Promise<Table> {
    try {
      const result = await this.repo.update({ id }, { ...updates });
      if (result.affected === 0) throw new NotFoundError('Table not found');
      const updated = await this.repo.findOneOrFail({ where: { id } });
      return toDomain(updated);
    } catch (e: any) {
      if (e?.code === PG_UNIQUE_VIOLATION) {
        throw new ConflictError('Table with this name already exists');
      }
      throw e;
    }
  }

  async delete(id: string): Promise<void> {
    const result = await this.repo.delete({ id });
    if (result.affected === 0) throw new NotFoundError('Table not found');
  }
} 