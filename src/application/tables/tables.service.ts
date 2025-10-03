import { Inject, Injectable } from '@nestjs/common';
import { TableRepository } from '@domain/table/table.repository';
import { Table } from '@domain/table/table';
import { Page, PageRequest } from '@domain/shared/pagination';
import { TOKENS } from '@domain/shared/tokens';
import { NotFoundError } from '@domain/shared/errors';

@Injectable()
export class TablesService {
  constructor(
    @Inject(TOKENS.TableRepository)
    private readonly tableRepo: TableRepository,
  ) {}

  async create(input: Omit<Table, 'id'>): Promise<Table> {
    return this.tableRepo.create(input);
  }

  async getById(id: string): Promise<Table> {
    const table = await this.tableRepo.findById(id);
    if (!table) throw new NotFoundError('Table not found');
    return table;
  }

  async list(page: PageRequest): Promise<Page<Table>> {
    return this.tableRepo.list(page);
  }

  async update(id: string, updates: Partial<Omit<Table, 'id'>>): Promise<Table> {
    return this.tableRepo.update(id, updates);
  }

  async delete(id: string): Promise<void> {
    return this.tableRepo.delete(id);
  }
} 