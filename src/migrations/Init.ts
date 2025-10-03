import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1730486400000 implements MigrationInterface {
  name = 'Init1730486400000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "tables" (
        "id" uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
        "name" varchar(255) NOT NULL,
        CONSTRAINT "uq_table_name" UNIQUE ("name")
      );
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "players" (
        "id" uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
        "name" varchar(255) NOT NULL,
        "tableId" uuid NOT NULL,
        CONSTRAINT "uq_player_name_table" UNIQUE ("name", "tableId"),
        CONSTRAINT "fk_player_table" FOREIGN KEY ("tableId") REFERENCES "tables"("id") ON DELETE CASCADE
      );
    `);

    await queryRunner.query(`CREATE INDEX IF NOT EXISTS "idx_player_tableId" ON "players" ("tableId")`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX IF EXISTS "idx_player_tableId"`);
    await queryRunner.query(`ALTER TABLE "players" DROP CONSTRAINT IF EXISTS "fk_player_table"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "players"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "tables"`);
  }
} 