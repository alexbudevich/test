import { MigrationInterface, QueryRunner } from 'typeorm';

export class addedBasketballMatchMetadataField1674837438930
  implements MigrationInterface
{
  name = 'addedBasketballMatchMetadataField1674837438930';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "basketball_league" ADD "metadata" text`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "basketball_league" DROP COLUMN "metadata"`,
    );
  }
}
