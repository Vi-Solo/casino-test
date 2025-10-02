import { Column, Entity, Index, OneToMany, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { PlayerOrmEntity } from './player.orm-entity';

@Entity({ name: 'tables' })
@Unique('uq_table_name', ['name'])
export class TableOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 255 })
  name!: string;

  @OneToMany(() => PlayerOrmEntity, (player) => player.table)
  players!: PlayerOrmEntity[];
} 