import { MigrationInterface, QueryRunner } from 'typeorm';

export class addBaskLeagueMetadata1674945146967 implements MigrationInterface {
  name = 'addBaskLeagueMetadata1674945146967';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "basketball_league" ADD "metadata" text`,
    );
    await queryRunner.query(
      `ALTER TABLE "basketball_match" DROP COLUMN "elapsed"`,
    );
    await queryRunner.query(
      `ALTER TABLE "basketball_match" ADD "elapsed" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "basketball_match" DROP COLUMN "elapsed"`,
    );
    await queryRunner.query(
      `ALTER TABLE "basketball_match" ADD "elapsed" smallint`,
    );
    await queryRunner.query(
      `ALTER TABLE "basketball_league" DROP COLUMN "metadata"`,
    );
  }
}
