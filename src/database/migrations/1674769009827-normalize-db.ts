import { MigrationInterface, QueryRunner } from 'typeorm';

export class normalizeDb1674769009827 implements MigrationInterface {
  name = 'normalizeDb1674769009827';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "venue" DROP CONSTRAINT "fk_8_1"`);
    await queryRunner.query(
      `ALTER TABLE "team_player" DROP CONSTRAINT "player"`,
    );
    await queryRunner.query(`ALTER TABLE "team_player" DROP CONSTRAINT "team"`);
    await queryRunner.query(`ALTER TABLE "team" DROP CONSTRAINT "fk_6"`);
    await queryRunner.query(`ALTER TABLE "team" DROP CONSTRAINT "sport_type"`);
    await queryRunner.query(`ALTER TABLE "team" DROP CONSTRAINT "fk_16"`);
    await queryRunner.query(`ALTER TABLE "team" DROP CONSTRAINT "fk_10"`);
    await queryRunner.query(`ALTER TABLE "player" DROP CONSTRAINT "fk_8"`);
    await queryRunner.query(
      `ALTER TABLE "player" DROP CONSTRAINT "sport_type"`,
    );
    await queryRunner.query(
      `ALTER TABLE "football_statistic" DROP CONSTRAINT "match"`,
    );
    await queryRunner.query(
      `ALTER TABLE "football_statistic" DROP CONSTRAINT "player"`,
    );
    await queryRunner.query(
      `ALTER TABLE "football_statistic" DROP CONSTRAINT "team"`,
    );
    await queryRunner.query(`ALTER TABLE "round" DROP CONSTRAINT "fk_9"`);
    await queryRunner.query(`ALTER TABLE "match" DROP CONSTRAINT "match_fk_1"`);
    await queryRunner.query(`ALTER TABLE "match" DROP CONSTRAINT "match_fk_2"`);
    await queryRunner.query(`ALTER TABLE "match" DROP CONSTRAINT "round_id"`);
    await queryRunner.query(`ALTER TABLE "match" DROP CONSTRAINT "sport_type"`);
    await queryRunner.query(`ALTER TABLE "match" DROP CONSTRAINT "fk_2"`);
    await queryRunner.query(`ALTER TABLE "match" DROP CONSTRAINT "fk_11"`);
    await queryRunner.query(`ALTER TABLE "match" DROP CONSTRAINT "fk_3"`);
    await queryRunner.query(`ALTER TABLE "match" DROP CONSTRAINT "fk_4"`);
    await queryRunner.query(`ALTER TABLE "odd" DROP CONSTRAINT "fk_19"`);
    await queryRunner.query(`ALTER TABLE "odd" DROP CONSTRAINT "odd_fk"`);
    await queryRunner.query(`ALTER TABLE "odd" DROP CONSTRAINT "sport_type"`);
    await queryRunner.query(`ALTER TABLE "bookmaker" DROP CONSTRAINT "fk_17"`);
    await queryRunner.query(`ALTER TABLE "week" DROP CONSTRAINT "season"`);
    await queryRunner.query(`ALTER TABLE "week" DROP CONSTRAINT "league"`);
    await queryRunner.query(`ALTER TABLE "league" DROP CONSTRAINT "fk_1"`);
    await queryRunner.query(
      `ALTER TABLE "league" DROP CONSTRAINT "sport_type"`,
    );
    await queryRunner.query(
      `ALTER TABLE "league_season" DROP CONSTRAINT "season"`,
    );
    await queryRunner.query(
      `ALTER TABLE "league_season" DROP CONSTRAINT "league"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."football_statistic_player_id_idx"`,
    );
    await queryRunner.query(
      `CREATE SEQUENCE IF NOT EXISTS "venue_id_seq" OWNED BY "venue"."id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "venue" ALTER COLUMN "id" SET DEFAULT nextval('"venue_id_seq"')`,
    );
    await queryRunner.query(
      `ALTER TABLE "venue" ALTER COLUMN "id" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "venue" ALTER COLUMN "timestamp" SET DEFAULT now()`,
    );
    await queryRunner.query(
      `CREATE SEQUENCE IF NOT EXISTS "team_player_id_seq" OWNED BY "team_player"."id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "team_player" ALTER COLUMN "id" SET DEFAULT nextval('"team_player_id_seq"')`,
    );
    await queryRunner.query(
      `ALTER TABLE "team_player" ALTER COLUMN "id" DROP DEFAULT`,
    );
    await queryRunner.query(
      `CREATE SEQUENCE IF NOT EXISTS "team_id_seq" OWNED BY "team"."id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "team" ALTER COLUMN "id" SET DEFAULT nextval('"team_id_seq"')`,
    );
    await queryRunner.query(
      `ALTER TABLE "team" ALTER COLUMN "id" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "team" ALTER COLUMN "timestamp" SET DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "team" ALTER COLUMN "sport_type_id" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "team" ALTER COLUMN "sport_type_id" DROP DEFAULT`,
    );
    await queryRunner.query(`DROP SEQUENCE "team_sport_type_id_seq"`);
    await queryRunner.query(
      `CREATE SEQUENCE IF NOT EXISTS "player_id_seq" OWNED BY "player"."id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "player" ALTER COLUMN "id" SET DEFAULT nextval('"player_id_seq"')`,
    );
    await queryRunner.query(
      `ALTER TABLE "player" ALTER COLUMN "id" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "player" ALTER COLUMN "timestamp" SET DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "player" ALTER COLUMN "sport_type_id" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "player" ALTER COLUMN "sport_type_id" DROP DEFAULT`,
    );
    await queryRunner.query(`DROP SEQUENCE "player_sport_type_id_seq"`);
    await queryRunner.query(
      `ALTER TABLE "football_statistic" ALTER COLUMN "timestamp" SET DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "football_statistic" ALTER COLUMN "match_id" DROP DEFAULT`,
    );
    await queryRunner.query(`DROP SEQUENCE "football_statistic_match_id_seq"`);
    await queryRunner.query(
      `ALTER TABLE "football_statistic" ALTER COLUMN "player_id" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "football_statistic" ALTER COLUMN "player_id" DROP DEFAULT`,
    );
    await queryRunner.query(`DROP SEQUENCE "football_statistic_player_id_seq"`);
    await queryRunner.query(
      `ALTER TABLE "football_statistic" ALTER COLUMN "team_id" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "football_statistic" ALTER COLUMN "team_id" DROP DEFAULT`,
    );
    await queryRunner.query(`DROP SEQUENCE "football_statistic_team_id_seq"`);
    await queryRunner.query(
      `CREATE SEQUENCE IF NOT EXISTS "round_id_seq" OWNED BY "round"."id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "round" ALTER COLUMN "id" SET DEFAULT nextval('"round_id_seq"')`,
    );
    await queryRunner.query(
      `ALTER TABLE "round" ALTER COLUMN "id" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "round" ALTER COLUMN "league_id" DROP NOT NULL`,
    );
    await queryRunner.query(
      `CREATE SEQUENCE IF NOT EXISTS "match_id_seq" OWNED BY "match"."id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "match" ALTER COLUMN "id" SET DEFAULT nextval('"match_id_seq"')`,
    );
    await queryRunner.query(
      `ALTER TABLE "match" ALTER COLUMN "id" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "match" ALTER COLUMN "timestamp" SET DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "match" ALTER COLUMN "league_id" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "match" ALTER COLUMN "round_id" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "match" ALTER COLUMN "sport_type_id" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "match" ALTER COLUMN "sport_type_id" DROP DEFAULT`,
    );
    await queryRunner.query(`DROP SEQUENCE "match_sport_type_id_seq"`);
    await queryRunner.query(
      `ALTER TABLE "match" ALTER COLUMN "venue_id" DROP NOT NULL`,
    );
    await queryRunner.query(
      `CREATE SEQUENCE IF NOT EXISTS "odd_id_seq" OWNED BY "odd"."id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "odd" ALTER COLUMN "id" SET DEFAULT nextval('"odd_id_seq"')`,
    );
    await queryRunner.query(`ALTER TABLE "odd" ALTER COLUMN "id" DROP DEFAULT`);
    await queryRunner.query(
      `ALTER TABLE "odd" ALTER COLUMN "timestamp" SET DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "odd" ALTER COLUMN "sport_type_id" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "odd" ALTER COLUMN "sport_type_id" DROP DEFAULT`,
    );
    await queryRunner.query(`DROP SEQUENCE "odd_sport_type_id_seq"`);
    await queryRunner.query(
      `CREATE SEQUENCE IF NOT EXISTS "bookmaker_id_seq" OWNED BY "bookmaker"."id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "bookmaker" ALTER COLUMN "id" SET DEFAULT nextval('"bookmaker_id_seq"')`,
    );
    await queryRunner.query(
      `ALTER TABLE "bookmaker" ALTER COLUMN "id" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "bookmaker" ALTER COLUMN "timestamp" SET DEFAULT now()`,
    );
    await queryRunner.query(
      `CREATE SEQUENCE IF NOT EXISTS "country_id_seq" OWNED BY "country"."id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "country" ALTER COLUMN "id" SET DEFAULT nextval('"country_id_seq"')`,
    );
    await queryRunner.query(
      `ALTER TABLE "country" ALTER COLUMN "id" DROP DEFAULT`,
    );
    await queryRunner.query(
      `CREATE SEQUENCE IF NOT EXISTS "season_id_seq" OWNED BY "season"."id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "season" ALTER COLUMN "id" SET DEFAULT nextval('"season_id_seq"')`,
    );
    await queryRunner.query(
      `ALTER TABLE "season" ALTER COLUMN "id" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "season" ALTER COLUMN "timestamp" SET DEFAULT now()`,
    );
    await queryRunner.query(
      `CREATE SEQUENCE IF NOT EXISTS "week_id_seq" OWNED BY "week"."id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "week" ALTER COLUMN "id" SET DEFAULT nextval('"week_id_seq"')`,
    );
    await queryRunner.query(
      `ALTER TABLE "week" ALTER COLUMN "id" DROP DEFAULT`,
    );
    await queryRunner.query(
      `CREATE SEQUENCE IF NOT EXISTS "league_id_seq" OWNED BY "league"."id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "league" ALTER COLUMN "id" SET DEFAULT nextval('"league_id_seq"')`,
    );
    await queryRunner.query(
      `ALTER TABLE "league" ALTER COLUMN "id" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "league" ALTER COLUMN "timestamp" SET DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "league" ALTER COLUMN "sport_type_id" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "league" ALTER COLUMN "sport_type_id" DROP DEFAULT`,
    );
    await queryRunner.query(`DROP SEQUENCE "league_sport_type_id_seq"`);
    await queryRunner.query(
      `ALTER TABLE "league_season" ALTER COLUMN "league_id" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "league_season" ALTER COLUMN "league_id" DROP DEFAULT`,
    );
    await queryRunner.query(`DROP SEQUENCE "league_season_league_id_seq"`);
    await queryRunner.query(
      `ALTER TABLE "league_season" ALTER COLUMN "season_id" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "league_season" ALTER COLUMN "season_id" DROP DEFAULT`,
    );
    await queryRunner.query(`DROP SEQUENCE "league_season_season_id_seq"`);
    await queryRunner.query(
      `ALTER TABLE "venue" ADD CONSTRAINT "FK_8c897a19adb4731787ce50fc657" FOREIGN KEY ("country_id") REFERENCES "country"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "team_player" ADD CONSTRAINT "FK_a6f4fcfc1c7229fbcb67c6fb4b2" FOREIGN KEY ("player_id") REFERENCES "player"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "team_player" ADD CONSTRAINT "FK_ac195c6f3ba8962bd9f11cc400d" FOREIGN KEY ("team_id") REFERENCES "team"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "team" ADD CONSTRAINT "FK_257d535157033a6d062a0f217b7" FOREIGN KEY ("country_id") REFERENCES "country"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "team" ADD CONSTRAINT "FK_61d5f175df34e436f88cb7f2859" FOREIGN KEY ("league_id") REFERENCES "league"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "team" ADD CONSTRAINT "FK_a0187e96dfe350636f3f406b889" FOREIGN KEY ("sport_type_id") REFERENCES "sport_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "team" ADD CONSTRAINT "FK_20089c23bf84b8cb502ca31d3d2" FOREIGN KEY ("venue_id") REFERENCES "venue"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "player" ADD CONSTRAINT "FK_90bf8f82860a6ff540c8422f318" FOREIGN KEY ("country_id") REFERENCES "country"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "player" ADD CONSTRAINT "FK_384073bf7e1a0f7e28918e3528e" FOREIGN KEY ("sport_type_id") REFERENCES "sport_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "football_statistic" ADD CONSTRAINT "FK_c0b223bee71d6581003b654cb3d" FOREIGN KEY ("match_id") REFERENCES "match"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "football_statistic" ADD CONSTRAINT "FK_0b876e3a4ee26868cacaf4732f7" FOREIGN KEY ("player_id") REFERENCES "player"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "football_statistic" ADD CONSTRAINT "FK_9a41f7c20d8221fa75ba5d02b94" FOREIGN KEY ("team_id") REFERENCES "team"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "round" ADD CONSTRAINT "FK_f57b2632b8f4bea753a691f7469" FOREIGN KEY ("league_id") REFERENCES "league"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "match" ADD CONSTRAINT "FK_5243e7f168b381cf979cd039ec9" FOREIGN KEY ("league_id") REFERENCES "league"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "match" ADD CONSTRAINT "FK_98634db1f8faed5067d2c83cab3" FOREIGN KEY ("player_1_id") REFERENCES "player"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "match" ADD CONSTRAINT "FK_1ba149d91bd88bf216f27a84ef8" FOREIGN KEY ("player_2_id") REFERENCES "player"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "match" ADD CONSTRAINT "FK_2cf189de1a1a33b002c671010c0" FOREIGN KEY ("round_id") REFERENCES "round"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "match" ADD CONSTRAINT "FK_aa32fa685d5628fdb0e1f39ec1c" FOREIGN KEY ("sport_type_id") REFERENCES "sport_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "match" ADD CONSTRAINT "FK_450109bebd37f9a6041fd81ffcc" FOREIGN KEY ("team_away_id") REFERENCES "team"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "match" ADD CONSTRAINT "FK_77a6478dc4ec1407dea056e3a64" FOREIGN KEY ("team_home_id") REFERENCES "team"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "match" ADD CONSTRAINT "FK_21fccb957fc8e428f50c1fa59d0" FOREIGN KEY ("venue_id") REFERENCES "venue"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "odd" ADD CONSTRAINT "FK_ece636d6e3aed167e62448b5b67" FOREIGN KEY ("bookmaker_id") REFERENCES "bookmaker"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "odd" ADD CONSTRAINT "FK_1d526a5f8195521a289b0d2c3a2" FOREIGN KEY ("match_id") REFERENCES "match"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "odd" ADD CONSTRAINT "FK_9ac43018bc2ccef004a553f56a9" FOREIGN KEY ("sport_type_id") REFERENCES "sport_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "bookmaker" ADD CONSTRAINT "FK_a9ee30ecf6360308d1c9ba3c86c" FOREIGN KEY ("country_id") REFERENCES "country"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "week" ADD CONSTRAINT "FK_cd8d2ec41a3bc36d3e0a2f4c570" FOREIGN KEY ("league_id") REFERENCES "league"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "week" ADD CONSTRAINT "FK_80850bbbb0a91abe0dab0aec8f8" FOREIGN KEY ("season_id") REFERENCES "season"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "league" ADD CONSTRAINT "FK_b18404cca582140a255fadf616a" FOREIGN KEY ("country_id") REFERENCES "country"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "league" ADD CONSTRAINT "FK_9070b9fb1b1e14af610ae4ce312" FOREIGN KEY ("sport_type_id") REFERENCES "sport_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "league_season" ADD CONSTRAINT "FK_22620c42e0750778225744ae505" FOREIGN KEY ("league_id") REFERENCES "league"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "league_season" ADD CONSTRAINT "FK_60a080e4eb5604bc67fe37a3d0e" FOREIGN KEY ("season_id") REFERENCES "season"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "league_season" DROP CONSTRAINT "FK_60a080e4eb5604bc67fe37a3d0e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "league_season" DROP CONSTRAINT "FK_22620c42e0750778225744ae505"`,
    );
    await queryRunner.query(
      `ALTER TABLE "league" DROP CONSTRAINT "FK_9070b9fb1b1e14af610ae4ce312"`,
    );
    await queryRunner.query(
      `ALTER TABLE "league" DROP CONSTRAINT "FK_b18404cca582140a255fadf616a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "week" DROP CONSTRAINT "FK_80850bbbb0a91abe0dab0aec8f8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "week" DROP CONSTRAINT "FK_cd8d2ec41a3bc36d3e0a2f4c570"`,
    );
    await queryRunner.query(
      `ALTER TABLE "bookmaker" DROP CONSTRAINT "FK_a9ee30ecf6360308d1c9ba3c86c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "odd" DROP CONSTRAINT "FK_9ac43018bc2ccef004a553f56a9"`,
    );
    await queryRunner.query(
      `ALTER TABLE "odd" DROP CONSTRAINT "FK_1d526a5f8195521a289b0d2c3a2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "odd" DROP CONSTRAINT "FK_ece636d6e3aed167e62448b5b67"`,
    );
    await queryRunner.query(
      `ALTER TABLE "match" DROP CONSTRAINT "FK_21fccb957fc8e428f50c1fa59d0"`,
    );
    await queryRunner.query(
      `ALTER TABLE "match" DROP CONSTRAINT "FK_77a6478dc4ec1407dea056e3a64"`,
    );
    await queryRunner.query(
      `ALTER TABLE "match" DROP CONSTRAINT "FK_450109bebd37f9a6041fd81ffcc"`,
    );
    await queryRunner.query(
      `ALTER TABLE "match" DROP CONSTRAINT "FK_aa32fa685d5628fdb0e1f39ec1c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "match" DROP CONSTRAINT "FK_2cf189de1a1a33b002c671010c0"`,
    );
    await queryRunner.query(
      `ALTER TABLE "match" DROP CONSTRAINT "FK_1ba149d91bd88bf216f27a84ef8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "match" DROP CONSTRAINT "FK_98634db1f8faed5067d2c83cab3"`,
    );
    await queryRunner.query(
      `ALTER TABLE "match" DROP CONSTRAINT "FK_5243e7f168b381cf979cd039ec9"`,
    );
    await queryRunner.query(
      `ALTER TABLE "round" DROP CONSTRAINT "FK_f57b2632b8f4bea753a691f7469"`,
    );
    await queryRunner.query(
      `ALTER TABLE "football_statistic" DROP CONSTRAINT "FK_9a41f7c20d8221fa75ba5d02b94"`,
    );
    await queryRunner.query(
      `ALTER TABLE "football_statistic" DROP CONSTRAINT "FK_0b876e3a4ee26868cacaf4732f7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "football_statistic" DROP CONSTRAINT "FK_c0b223bee71d6581003b654cb3d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "player" DROP CONSTRAINT "FK_384073bf7e1a0f7e28918e3528e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "player" DROP CONSTRAINT "FK_90bf8f82860a6ff540c8422f318"`,
    );
    await queryRunner.query(
      `ALTER TABLE "team" DROP CONSTRAINT "FK_20089c23bf84b8cb502ca31d3d2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "team" DROP CONSTRAINT "FK_a0187e96dfe350636f3f406b889"`,
    );
    await queryRunner.query(
      `ALTER TABLE "team" DROP CONSTRAINT "FK_61d5f175df34e436f88cb7f2859"`,
    );
    await queryRunner.query(
      `ALTER TABLE "team" DROP CONSTRAINT "FK_257d535157033a6d062a0f217b7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "team_player" DROP CONSTRAINT "FK_ac195c6f3ba8962bd9f11cc400d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "team_player" DROP CONSTRAINT "FK_a6f4fcfc1c7229fbcb67c6fb4b2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "venue" DROP CONSTRAINT "FK_8c897a19adb4731787ce50fc657"`,
    );
    await queryRunner.query(
      `CREATE SEQUENCE IF NOT EXISTS "league_season_season_id_seq" OWNED BY "league_season"."season_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "league_season" ALTER COLUMN "season_id" SET DEFAULT nextval('"league_season_season_id_seq"')`,
    );
    await queryRunner.query(
      `ALTER TABLE "league_season" ALTER COLUMN "season_id" SET NOT NULL`,
    );
    await queryRunner.query(
      `CREATE SEQUENCE IF NOT EXISTS "league_season_league_id_seq" OWNED BY "league_season"."league_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "league_season" ALTER COLUMN "league_id" SET DEFAULT nextval('"league_season_league_id_seq"')`,
    );
    await queryRunner.query(
      `ALTER TABLE "league_season" ALTER COLUMN "league_id" SET NOT NULL`,
    );
    await queryRunner.query(
      `CREATE SEQUENCE IF NOT EXISTS "league_sport_type_id_seq" OWNED BY "league"."sport_type_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "league" ALTER COLUMN "sport_type_id" SET DEFAULT nextval('"league_sport_type_id_seq"')`,
    );
    await queryRunner.query(
      `ALTER TABLE "league" ALTER COLUMN "sport_type_id" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "league" ALTER COLUMN "timestamp" SET DEFAULT CURRENT_TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE "league" ALTER COLUMN "id" SET DEFAULT nextval('league_id_seq2')`,
    );
    await queryRunner.query(
      `ALTER TABLE "league" ALTER COLUMN "id" DROP DEFAULT`,
    );
    await queryRunner.query(`DROP SEQUENCE "league_id_seq"`);
    await queryRunner.query(
      `ALTER TABLE "week" ALTER COLUMN "id" SET DEFAULT nextval('week_id_seq2')`,
    );
    await queryRunner.query(
      `ALTER TABLE "week" ALTER COLUMN "id" DROP DEFAULT`,
    );
    await queryRunner.query(`DROP SEQUENCE "week_id_seq"`);
    await queryRunner.query(
      `ALTER TABLE "season" ALTER COLUMN "timestamp" SET DEFAULT CURRENT_TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE "season" ALTER COLUMN "id" SET DEFAULT nextval('season_id_seq2')`,
    );
    await queryRunner.query(
      `ALTER TABLE "season" ALTER COLUMN "id" DROP DEFAULT`,
    );
    await queryRunner.query(`DROP SEQUENCE "season_id_seq"`);
    await queryRunner.query(
      `ALTER TABLE "country" ALTER COLUMN "id" SET DEFAULT nextval('country_id_seq2')`,
    );
    await queryRunner.query(
      `ALTER TABLE "country" ALTER COLUMN "id" DROP DEFAULT`,
    );
    await queryRunner.query(`DROP SEQUENCE "country_id_seq"`);
    await queryRunner.query(
      `ALTER TABLE "bookmaker" ALTER COLUMN "timestamp" SET DEFAULT CURRENT_TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE "bookmaker" ALTER COLUMN "id" SET DEFAULT nextval('bookmaker_id_seq1')`,
    );
    await queryRunner.query(
      `ALTER TABLE "bookmaker" ALTER COLUMN "id" DROP DEFAULT`,
    );
    await queryRunner.query(`DROP SEQUENCE "bookmaker_id_seq"`);
    await queryRunner.query(
      `CREATE SEQUENCE IF NOT EXISTS "odd_sport_type_id_seq" OWNED BY "odd"."sport_type_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "odd" ALTER COLUMN "sport_type_id" SET DEFAULT nextval('"odd_sport_type_id_seq"')`,
    );
    await queryRunner.query(
      `ALTER TABLE "odd" ALTER COLUMN "sport_type_id" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "odd" ALTER COLUMN "timestamp" SET DEFAULT CURRENT_TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE "odd" ALTER COLUMN "id" SET DEFAULT nextval('odd_id_seq2')`,
    );
    await queryRunner.query(`ALTER TABLE "odd" ALTER COLUMN "id" DROP DEFAULT`);
    await queryRunner.query(`DROP SEQUENCE "odd_id_seq"`);
    await queryRunner.query(
      `ALTER TABLE "match" ALTER COLUMN "venue_id" SET NOT NULL`,
    );
    await queryRunner.query(
      `CREATE SEQUENCE IF NOT EXISTS "match_sport_type_id_seq" OWNED BY "match"."sport_type_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "match" ALTER COLUMN "sport_type_id" SET DEFAULT nextval('"match_sport_type_id_seq"')`,
    );
    await queryRunner.query(
      `ALTER TABLE "match" ALTER COLUMN "sport_type_id" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "match" ALTER COLUMN "round_id" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "match" ALTER COLUMN "league_id" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "match" ALTER COLUMN "timestamp" SET DEFAULT CURRENT_TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE "match" ALTER COLUMN "id" SET DEFAULT nextval('match_id_seq2')`,
    );
    await queryRunner.query(
      `ALTER TABLE "match" ALTER COLUMN "id" DROP DEFAULT`,
    );
    await queryRunner.query(`DROP SEQUENCE "match_id_seq"`);
    await queryRunner.query(
      `ALTER TABLE "round" ALTER COLUMN "league_id" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "round" ALTER COLUMN "id" SET DEFAULT nextval('round_id_seq2')`,
    );
    await queryRunner.query(
      `ALTER TABLE "round" ALTER COLUMN "id" DROP DEFAULT`,
    );
    await queryRunner.query(`DROP SEQUENCE "round_id_seq"`);
    await queryRunner.query(
      `CREATE SEQUENCE IF NOT EXISTS "football_statistic_team_id_seq" OWNED BY "football_statistic"."team_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "football_statistic" ALTER COLUMN "team_id" SET DEFAULT nextval('"football_statistic_team_id_seq"')`,
    );
    await queryRunner.query(
      `ALTER TABLE "football_statistic" ALTER COLUMN "team_id" SET NOT NULL`,
    );
    await queryRunner.query(
      `CREATE SEQUENCE IF NOT EXISTS "football_statistic_player_id_seq" OWNED BY "football_statistic"."player_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "football_statistic" ALTER COLUMN "player_id" SET DEFAULT nextval('"football_statistic_player_id_seq"')`,
    );
    await queryRunner.query(
      `ALTER TABLE "football_statistic" ALTER COLUMN "player_id" SET NOT NULL`,
    );
    await queryRunner.query(
      `CREATE SEQUENCE IF NOT EXISTS "football_statistic_match_id_seq" OWNED BY "football_statistic"."match_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "football_statistic" ALTER COLUMN "match_id" SET DEFAULT nextval('"football_statistic_match_id_seq"')`,
    );
    await queryRunner.query(
      `ALTER TABLE "football_statistic" ALTER COLUMN "timestamp" SET DEFAULT CURRENT_TIMESTAMP`,
    );
    await queryRunner.query(
      `CREATE SEQUENCE IF NOT EXISTS "player_sport_type_id_seq" OWNED BY "player"."sport_type_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "player" ALTER COLUMN "sport_type_id" SET DEFAULT nextval('"player_sport_type_id_seq"')`,
    );
    await queryRunner.query(
      `ALTER TABLE "player" ALTER COLUMN "sport_type_id" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "player" ALTER COLUMN "timestamp" SET DEFAULT CURRENT_TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE "player" ALTER COLUMN "id" SET DEFAULT nextval('player_id_seq2')`,
    );
    await queryRunner.query(
      `ALTER TABLE "player" ALTER COLUMN "id" DROP DEFAULT`,
    );
    await queryRunner.query(`DROP SEQUENCE "player_id_seq"`);
    await queryRunner.query(
      `CREATE SEQUENCE IF NOT EXISTS "team_sport_type_id_seq" OWNED BY "team"."sport_type_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "team" ALTER COLUMN "sport_type_id" SET DEFAULT nextval('"team_sport_type_id_seq"')`,
    );
    await queryRunner.query(
      `ALTER TABLE "team" ALTER COLUMN "sport_type_id" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "team" ALTER COLUMN "timestamp" SET DEFAULT CURRENT_TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE "team" ALTER COLUMN "id" SET DEFAULT nextval('team_id_seq2')`,
    );
    await queryRunner.query(
      `ALTER TABLE "team" ALTER COLUMN "id" DROP DEFAULT`,
    );
    await queryRunner.query(`DROP SEQUENCE "team_id_seq"`);
    await queryRunner.query(
      `ALTER TABLE "team_player" ALTER COLUMN "id" SET DEFAULT nextval('team_player_id_seq2')`,
    );
    await queryRunner.query(
      `ALTER TABLE "team_player" ALTER COLUMN "id" DROP DEFAULT`,
    );
    await queryRunner.query(`DROP SEQUENCE "team_player_id_seq"`);
    await queryRunner.query(
      `ALTER TABLE "venue" ALTER COLUMN "timestamp" SET DEFAULT CURRENT_TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE "venue" ALTER COLUMN "id" SET DEFAULT nextval('venue_id_seq2')`,
    );
    await queryRunner.query(
      `ALTER TABLE "venue" ALTER COLUMN "id" DROP DEFAULT`,
    );
    await queryRunner.query(`DROP SEQUENCE "venue_id_seq"`);
    await queryRunner.query(
      `CREATE INDEX "football_statistic_player_id_idx" ON "football_statistic" ("player_id") `,
    );
    await queryRunner.query(
      `ALTER TABLE "league_season" ADD CONSTRAINT "league" FOREIGN KEY ("league_id", "league_id") REFERENCES "league"("id","id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "league_season" ADD CONSTRAINT "season" FOREIGN KEY ("season_id", "season_id") REFERENCES "season"("id","id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "league" ADD CONSTRAINT "sport_type" FOREIGN KEY ("sport_type_id", "sport_type_id", "sport_type_id", "sport_type_id", "sport_type_id") REFERENCES "sport_type"("id","id","id","id","id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "league" ADD CONSTRAINT "fk_1" FOREIGN KEY ("country_id") REFERENCES "country"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "week" ADD CONSTRAINT "league" FOREIGN KEY ("league_id", "league_id") REFERENCES "league"("id","id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "week" ADD CONSTRAINT "season" FOREIGN KEY ("season_id", "season_id") REFERENCES "season"("id","id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "bookmaker" ADD CONSTRAINT "fk_17" FOREIGN KEY ("country_id") REFERENCES "country"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "odd" ADD CONSTRAINT "sport_type" FOREIGN KEY ("sport_type_id", "sport_type_id", "sport_type_id", "sport_type_id", "sport_type_id") REFERENCES "sport_type"("id","id","id","id","id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "odd" ADD CONSTRAINT "odd_fk" FOREIGN KEY ("bookmaker_id") REFERENCES "bookmaker"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "odd" ADD CONSTRAINT "fk_19" FOREIGN KEY ("match_id") REFERENCES "match"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "match" ADD CONSTRAINT "fk_4" FOREIGN KEY ("team_home_id") REFERENCES "team"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "match" ADD CONSTRAINT "fk_3" FOREIGN KEY ("team_away_id") REFERENCES "team"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "match" ADD CONSTRAINT "fk_11" FOREIGN KEY ("venue_id") REFERENCES "venue"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "match" ADD CONSTRAINT "fk_2" FOREIGN KEY ("league_id") REFERENCES "league"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "match" ADD CONSTRAINT "sport_type" FOREIGN KEY ("sport_type_id", "sport_type_id", "sport_type_id", "sport_type_id", "sport_type_id") REFERENCES "sport_type"("id","id","id","id","id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "match" ADD CONSTRAINT "round_id" FOREIGN KEY ("round_id") REFERENCES "round"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "match" ADD CONSTRAINT "match_fk_2" FOREIGN KEY ("player_1_id") REFERENCES "player"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "match" ADD CONSTRAINT "match_fk_1" FOREIGN KEY ("player_2_id") REFERENCES "player"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "round" ADD CONSTRAINT "fk_9" FOREIGN KEY ("league_id") REFERENCES "league"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "football_statistic" ADD CONSTRAINT "team" FOREIGN KEY ("team_id", "team_id") REFERENCES "team"("id","id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "football_statistic" ADD CONSTRAINT "player" FOREIGN KEY ("player_id", "player_id") REFERENCES "player"("id","id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "football_statistic" ADD CONSTRAINT "match" FOREIGN KEY ("match_id") REFERENCES "match"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "player" ADD CONSTRAINT "sport_type" FOREIGN KEY ("sport_type_id", "sport_type_id", "sport_type_id", "sport_type_id", "sport_type_id") REFERENCES "sport_type"("id","id","id","id","id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "player" ADD CONSTRAINT "fk_8" FOREIGN KEY ("country_id") REFERENCES "country"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "team" ADD CONSTRAINT "fk_10" FOREIGN KEY ("venue_id") REFERENCES "venue"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "team" ADD CONSTRAINT "fk_16" FOREIGN KEY ("league_id") REFERENCES "league"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "team" ADD CONSTRAINT "sport_type" FOREIGN KEY ("sport_type_id", "sport_type_id", "sport_type_id", "sport_type_id", "sport_type_id") REFERENCES "sport_type"("id","id","id","id","id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "team" ADD CONSTRAINT "fk_6" FOREIGN KEY ("country_id") REFERENCES "country"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "team_player" ADD CONSTRAINT "team" FOREIGN KEY ("team_id", "team_id") REFERENCES "team"("id","id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "team_player" ADD CONSTRAINT "player" FOREIGN KEY ("player_id", "player_id") REFERENCES "player"("id","id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "venue" ADD CONSTRAINT "fk_8_1" FOREIGN KEY ("country_id") REFERENCES "country"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
