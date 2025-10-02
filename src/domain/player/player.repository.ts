import { Page, PageRequest } from '../shared/pagination';
import { Player } from './player';

export interface PlayerRepository {
  create(player: Omit<Player, 'id'>): Promise<Player>;
  findById(id: string): Promise<Player | null>;
  findByNameAndTableId(name: string, tableId: string): Promise<Player | null>;
  list(page: PageRequest): Promise<Page<Player>>;
  listByTableId(tableId: string, page: PageRequest): Promise<Page<Player>>;
  update(id: string, updates: Partial<Omit<Player, 'id' | 'tableId'>> & { tableId?: string }): Promise<Player>;
  delete(id: string): Promise<void>;
} 