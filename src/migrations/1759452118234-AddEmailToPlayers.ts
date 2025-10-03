import { MigrationInterface, QueryRunner } from "typeorm";

export class AddEmailToPlayers_1759452118234 implements MigrationInterface {
    name = 'AddEmailToPlayers_1759452118234'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "players" DROP CONSTRAINT "fk_player_table"`);
        await queryRunner.query(`ALTER TABLE "players" ADD "email" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "players" ADD CONSTRAINT "UQ_3abeb86b19703d782f0beff84c0" UNIQUE ("email")`);
        await queryRunner.query(`ALTER TABLE "players" ADD CONSTRAINT "FK_4e3ae1dc19aaaa4c7196bf386a8" FOREIGN KEY ("tableId") REFERENCES "tables"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "players" DROP CONSTRAINT "FK_4e3ae1dc19aaaa4c7196bf386a8"`);
        await queryRunner.query(`ALTER TABLE "players" DROP CONSTRAINT "UQ_3abeb86b19703d782f0beff84c0"`);
        await queryRunner.query(`ALTER TABLE "players" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "players" ADD CONSTRAINT "fk_player_table" FOREIGN KEY ("tableId") REFERENCES "tables"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
