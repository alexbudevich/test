import { MigrationInterface, QueryRunner } from 'typeorm';

export class addedLeaguePrior1675170377165 implements MigrationInterface {
  name = 'addedLeaguePrior1675170377165';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "league" ADD "prior" numeric`);
    await queryRunner.query(
      `ALTER TABLE "basketball_league" ADD "prior" numeric`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "basketball_league" DROP COLUMN "prior"`,
    );
    await queryRunner.query(`ALTER TABLE "league" DROP COLUMN "prior"`);
  }
}
