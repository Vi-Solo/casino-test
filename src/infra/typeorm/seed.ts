import 'reflect-metadata';
import * as dotenv from 'dotenv';
import dataSource from './data-source';
import { TableOrmEntity } from './entities/table.orm-entity';
import { PlayerOrmEntity } from './entities/player.orm-entity';

dotenv.config();

async function runSeed(): Promise<void> {
  await dataSource.initialize();
  try {
    await dataSource.transaction(async (manager) => {
      await manager.query('DELETE FROM "players"');
      await manager.query('DELETE FROM "tables"');

      const tableNames = ['Blackjack', 'Poker', 'Roulette'];
      const tableEntities = tableNames.map((name) => manager.create(TableOrmEntity, { name }));
      const savedTables = await manager.save(TableOrmEntity, tableEntities);
      const players: PlayerOrmEntity[] = [];
      for (let i = 1; i <= 20; i++) {
        const index = (i - 1) % savedTables.length;
        const table = savedTables[index];
        const name = `Player${String(i).padStart(2, '0')}`;
        const email = `${name.toLowerCase()}@example.com`;
        const player = manager.create(PlayerOrmEntity, {
          name,
          email,
          tableId: table.id,
        });
        players.push(player);
      }

      await manager.save(PlayerOrmEntity, players);
    });

    console.log('Seed completed successfully');
  } finally {
    await dataSource.destroy();
  }
}

runSeed().catch((err) => {
  console.error('Seed failed', err);
  process.exit(1);
});
