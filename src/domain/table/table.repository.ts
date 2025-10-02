import { Page, PageRequest } from '../shared/pagination';
import { Table } from './table';

export interface TableRepository {
  create(table: Omit<Table, 'id'>): Promise<Table>;
  findById(id: string): Promise<Table | null>;
  findByName(name: string): Promise<Table | null>;
  list(page: PageRequest): Promise<Page<Table>>;
  update(id: string, updates: Partial<Omit<Table, 'id'>>): Promise<Table>;
  delete(id: string): Promise<void>;
} 