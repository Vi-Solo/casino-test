import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique, Index } from 'typeorm';
import { TableOrmEntity } from './table.orm-entity';

@Entity({ name: 'players' })
@Unique('uq_player_name_table', ['name', 'tableId'])
@Unique('uq_player_email', ['email'])
@Index('idx_player_tableId', ['tableId'])
export class PlayerOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 255 })
  name!: string;

  @Column({ type: 'varchar', length: 255 })
  email!: string;

  @Column({ type: 'uuid' })
  tableId!: string;

  @ManyToOne(() => TableOrmEntity, (table) => table.players, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'tableId' })
  table!: TableOrmEntity;
} 