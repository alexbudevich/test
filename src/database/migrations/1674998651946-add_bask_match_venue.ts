import { MigrationInterface, QueryRunner } from "typeorm";

export class addBaskMatchVenue1674998651946 implements MigrationInterface {
    name = 'addBaskMatchVenue1674998651946'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "basketball_match" ADD "venue_id" integer`);
        await queryRunner.query(`ALTER TABLE "basketball_match" ADD CONSTRAINT "FK_612ff2f22c5244fbb2de7bb2ea9" FOREIGN KEY ("venue_id") REFERENCES "venue"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "basketball_match" DROP CONSTRAINT "FK_612ff2f22c5244fbb2de7bb2ea9"`);
        await queryRunner.query(`ALTER TABLE "basketball_match" DROP COLUMN "venue_id"`);
    }

}
