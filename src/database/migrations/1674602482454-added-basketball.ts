import { MigrationInterface, QueryRunner } from "typeorm";

export class addedBasketball1674602482454 implements MigrationInterface {
    name = 'addedBasketball1674602482454'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "odd" DROP CONSTRAINT "FK_9ac43018bc2ccef004a553f56a9"`);
        await queryRunner.query(`ALTER TABLE "venue" DROP CONSTRAINT "FK_8c897a19adb4731787ce50fc657"`);
        await queryRunner.query(`ALTER TABLE "player" DROP CONSTRAINT "FK_90bf8f82860a6ff540c8422f318"`);
        await queryRunner.query(`ALTER TABLE "player" DROP CONSTRAINT "FK_384073bf7e1a0f7e28918e3528e"`);
        await queryRunner.query(`ALTER TABLE "team" DROP CONSTRAINT "FK_257d535157033a6d062a0f217b7"`);
        await queryRunner.query(`ALTER TABLE "team" DROP CONSTRAINT "FK_a0187e96dfe350636f3f406b889"`);
        await queryRunner.query(`ALTER TABLE "match" DROP CONSTRAINT "FK_aa32fa685d5628fdb0e1f39ec1c"`);
        await queryRunner.query(`CREATE TABLE "basketball_league" ("id" SERIAL NOT NULL, "name" text, "type" character varying(50), "logo_url" text, "provider_id" character varying(50), "timestamp" TIMESTAMP WITH TIME ZONE DEFAULT now(), "standings" json, "slug" text, "s3_logo_url" text, "description" text, "season_start" TIMESTAMP WITH TIME ZONE, "season_end" TIMESTAMP WITH TIME ZONE, "country_id" integer, "sport_type_id" integer, CONSTRAINT "PK_382dceb7656d1d14c679d2e4cd8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "basketball_league_slug_idx" ON "basketball_league" ("slug") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "basketball_league_pkey" ON "basketball_league" ("id") `);
        await queryRunner.query(`CREATE TABLE "basketball_odd" ("id" SERIAL NOT NULL, "match_id" integer, "bookmaker_id" integer, "name" character varying(50), "value" character varying(50), "handicap" integer, "is_main" boolean, "is_suspended" boolean, "odd" numeric, "provider_id" character varying(50), "timestamp" TIMESTAMP WITH TIME ZONE DEFAULT now(), CONSTRAINT "PK_93cba20d95abd69c45462836f3f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "basketball_odd_match_id_idx" ON "basketball_odd" ("match_id") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "basketball_odd_pkey" ON "basketball_odd" ("id") `);
        await queryRunner.query(`CREATE INDEX "basketball_odd_match_id_bookmaker_id_idx" ON "basketball_odd" ("bookmaker_id", "match_id") `);
        await queryRunner.query(`CREATE INDEX "basketball_odd_bookmaker_id_idx" ON "basketball_odd" ("bookmaker_id") `);
        await queryRunner.query(`CREATE TABLE "basketball_match" ("id" SERIAL NOT NULL, "date" TIMESTAMP WITH TIME ZONE, "match_score_home" smallint, "match_score_away" smallint, "elapsed" smallint, "status_short" character varying(5), "status_long" character varying, "statistics" json, "is_live" boolean, "provider_id" character varying(50), "slug" text, "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "league_id" integer, "team_away_id" integer, "team_home_id" integer, CONSTRAINT "PK_1aec3c92ffbcfa174b0f74f2303" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "basketball_match_slug_idx" ON "basketball_match" ("slug") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "basketball_match_pkey" ON "basketball_match" ("id") `);
        await queryRunner.query(`CREATE TABLE "basketball_league_season" ("league_id" integer NOT NULL, "season_id" integer NOT NULL, CONSTRAINT "PK_bfc2a4e66fd38c1ef13f3c92956" PRIMARY KEY ("league_id", "season_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_281eb26ca566287706ded660fe" ON "basketball_league_season" ("league_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_6ee19081c05bffc23aa86bff2e" ON "basketball_league_season" ("season_id") `);
        await queryRunner.query(`ALTER TABLE "odd" DROP COLUMN "sport_type_id"`);
        await queryRunner.query(`ALTER TABLE "venue" DROP COLUMN "country_id"`);
        await queryRunner.query(`ALTER TABLE "player" DROP COLUMN "country_id"`);
        await queryRunner.query(`ALTER TABLE "player" DROP COLUMN "sport_type_id"`);
        await queryRunner.query(`ALTER TABLE "team" DROP COLUMN "country_id"`);
        await queryRunner.query(`ALTER TABLE "team" DROP COLUMN "sport_type_id"`);
        await queryRunner.query(`ALTER TABLE "match" DROP COLUMN "sport_type_id"`);
        await queryRunner.query(`CREATE SEQUENCE IF NOT EXISTS "odd_id_seq" OWNED BY "odd"."id"`);
        await queryRunner.query(`ALTER TABLE "odd" ALTER COLUMN "id" SET DEFAULT nextval('"odd_id_seq"')`);
        await queryRunner.query(`ALTER TABLE "odd" ALTER COLUMN "id" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "odd" DROP CONSTRAINT "FK_ece636d6e3aed167e62448b5b67"`);
        await queryRunner.query(`CREATE SEQUENCE IF NOT EXISTS "bookmaker_id_seq" OWNED BY "bookmaker"."id"`);
        await queryRunner.query(`ALTER TABLE "bookmaker" ALTER COLUMN "id" SET DEFAULT nextval('"bookmaker_id_seq"')`);
        await queryRunner.query(`ALTER TABLE "bookmaker" ALTER COLUMN "id" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "bookmaker" DROP CONSTRAINT "FK_a9ee30ecf6360308d1c9ba3c86c"`);
        await queryRunner.query(`ALTER TABLE "league" DROP CONSTRAINT "FK_b18404cca582140a255fadf616a"`);
        await queryRunner.query(`CREATE SEQUENCE IF NOT EXISTS "country_id_seq" OWNED BY "country"."id"`);
        await queryRunner.query(`ALTER TABLE "country" ALTER COLUMN "id" SET DEFAULT nextval('"country_id_seq"')`);
        await queryRunner.query(`ALTER TABLE "country" ALTER COLUMN "id" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "match" DROP CONSTRAINT "FK_2cf189de1a1a33b002c671010c0"`);
        await queryRunner.query(`CREATE SEQUENCE IF NOT EXISTS "round_id_seq" OWNED BY "round"."id"`);
        await queryRunner.query(`ALTER TABLE "round" ALTER COLUMN "id" SET DEFAULT nextval('"round_id_seq"')`);
        await queryRunner.query(`ALTER TABLE "round" ALTER COLUMN "id" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "match" DROP CONSTRAINT "FK_21fccb957fc8e428f50c1fa59d0"`);
        await queryRunner.query(`ALTER TABLE "team" DROP CONSTRAINT "FK_20089c23bf84b8cb502ca31d3d2"`);
        await queryRunner.query(`CREATE SEQUENCE IF NOT EXISTS "venue_id_seq" OWNED BY "venue"."id"`);
        await queryRunner.query(`ALTER TABLE "venue" ALTER COLUMN "id" SET DEFAULT nextval('"venue_id_seq"')`);
        await queryRunner.query(`ALTER TABLE "venue" ALTER COLUMN "id" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "team_player" DROP CONSTRAINT "FK_a6f4fcfc1c7229fbcb67c6fb4b2"`);
        await queryRunner.query(`ALTER TABLE "match" DROP CONSTRAINT "FK_98634db1f8faed5067d2c83cab3"`);
        await queryRunner.query(`ALTER TABLE "football_statistic" DROP CONSTRAINT "FK_0b876e3a4ee26868cacaf4732f7"`);
        await queryRunner.query(`CREATE SEQUENCE IF NOT EXISTS "player_id_seq" OWNED BY "player"."id"`);
        await queryRunner.query(`ALTER TABLE "player" ALTER COLUMN "id" SET DEFAULT nextval('"player_id_seq"')`);
        await queryRunner.query(`ALTER TABLE "player" ALTER COLUMN "id" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "team_player" DROP CONSTRAINT "FK_ac195c6f3ba8962bd9f11cc400d"`);
        await queryRunner.query(`ALTER TABLE "match" DROP CONSTRAINT "FK_450109bebd37f9a6041fd81ffcc"`);
        await queryRunner.query(`ALTER TABLE "football_statistic" DROP CONSTRAINT "FK_9a41f7c20d8221fa75ba5d02b94"`);
        await queryRunner.query(`CREATE SEQUENCE IF NOT EXISTS "team_id_seq" OWNED BY "team"."id"`);
        await queryRunner.query(`ALTER TABLE "team" ALTER COLUMN "id" SET DEFAULT nextval('"team_id_seq"')`);
        await queryRunner.query(`ALTER TABLE "team" ALTER COLUMN "id" DROP DEFAULT`);
        await queryRunner.query(`CREATE SEQUENCE IF NOT EXISTS "week_id_seq" OWNED BY "week"."id"`);
        await queryRunner.query(`ALTER TABLE "week" ALTER COLUMN "id" SET DEFAULT nextval('"week_id_seq"')`);
        await queryRunner.query(`ALTER TABLE "week" ALTER COLUMN "id" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "league_season" DROP CONSTRAINT "FK_60a080e4eb5604bc67fe37a3d0e"`);
        await queryRunner.query(`ALTER TABLE "week" DROP CONSTRAINT "FK_80850bbbb0a91abe0dab0aec8f8"`);
        await queryRunner.query(`CREATE SEQUENCE IF NOT EXISTS "season_id_seq" OWNED BY "season"."id"`);
        await queryRunner.query(`ALTER TABLE "season" ALTER COLUMN "id" SET DEFAULT nextval('"season_id_seq"')`);
        await queryRunner.query(`ALTER TABLE "season" ALTER COLUMN "id" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "league_season" DROP CONSTRAINT "FK_22620c42e0750778225744ae505"`);
        await queryRunner.query(`ALTER TABLE "match" DROP CONSTRAINT "FK_5243e7f168b381cf979cd039ec9"`);
        await queryRunner.query(`ALTER TABLE "team" DROP CONSTRAINT "FK_61d5f175df34e436f88cb7f2859"`);
        await queryRunner.query(`ALTER TABLE "round" DROP CONSTRAINT "FK_f57b2632b8f4bea753a691f7469"`);
        await queryRunner.query(`ALTER TABLE "week" DROP CONSTRAINT "FK_cd8d2ec41a3bc36d3e0a2f4c570"`);
        await queryRunner.query(`CREATE SEQUENCE IF NOT EXISTS "league_id_seq" OWNED BY "league"."id"`);
        await queryRunner.query(`ALTER TABLE "league" ALTER COLUMN "id" SET DEFAULT nextval('"league_id_seq"')`);
        await queryRunner.query(`ALTER TABLE "league" ALTER COLUMN "id" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "odd" DROP CONSTRAINT "FK_1d526a5f8195521a289b0d2c3a2"`);
        await queryRunner.query(`ALTER TABLE "football_statistic" DROP CONSTRAINT "FK_c0b223bee71d6581003b654cb3d"`);
        await queryRunner.query(`CREATE SEQUENCE IF NOT EXISTS "match_id_seq" OWNED BY "match"."id"`);
        await queryRunner.query(`ALTER TABLE "match" ALTER COLUMN "id" SET DEFAULT nextval('"match_id_seq"')`);
        await queryRunner.query(`ALTER TABLE "match" ALTER COLUMN "id" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "odd" ADD CONSTRAINT "FK_ece636d6e3aed167e62448b5b67" FOREIGN KEY ("bookmaker_id") REFERENCES "bookmaker"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "odd" ADD CONSTRAINT "FK_1d526a5f8195521a289b0d2c3a2" FOREIGN KEY ("match_id") REFERENCES "match"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "bookmaker" ADD CONSTRAINT "FK_a9ee30ecf6360308d1c9ba3c86c" FOREIGN KEY ("country_id") REFERENCES "country"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "round" ADD CONSTRAINT "FK_f57b2632b8f4bea753a691f7469" FOREIGN KEY ("league_id") REFERENCES "league"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "team" ADD CONSTRAINT "FK_61d5f175df34e436f88cb7f2859" FOREIGN KEY ("league_id") REFERENCES "league"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "team" ADD CONSTRAINT "FK_20089c23bf84b8cb502ca31d3d2" FOREIGN KEY ("venue_id") REFERENCES "venue"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "week" ADD CONSTRAINT "FK_cd8d2ec41a3bc36d3e0a2f4c570" FOREIGN KEY ("league_id") REFERENCES "league"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "week" ADD CONSTRAINT "FK_80850bbbb0a91abe0dab0aec8f8" FOREIGN KEY ("season_id") REFERENCES "season"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "league" ADD CONSTRAINT "FK_b18404cca582140a255fadf616a" FOREIGN KEY ("country_id") REFERENCES "country"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "match" ADD CONSTRAINT "FK_5243e7f168b381cf979cd039ec9" FOREIGN KEY ("league_id") REFERENCES "league"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "match" ADD CONSTRAINT "FK_98634db1f8faed5067d2c83cab3" FOREIGN KEY ("player_1_id") REFERENCES "player"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "match" ADD CONSTRAINT "FK_1ba149d91bd88bf216f27a84ef8" FOREIGN KEY ("player_2_id") REFERENCES "player"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "match" ADD CONSTRAINT "FK_2cf189de1a1a33b002c671010c0" FOREIGN KEY ("round_id") REFERENCES "round"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "match" ADD CONSTRAINT "FK_450109bebd37f9a6041fd81ffcc" FOREIGN KEY ("team_away_id") REFERENCES "team"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "match" ADD CONSTRAINT "FK_77a6478dc4ec1407dea056e3a64" FOREIGN KEY ("team_home_id") REFERENCES "team"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "match" ADD CONSTRAINT "FK_21fccb957fc8e428f50c1fa59d0" FOREIGN KEY ("venue_id") REFERENCES "venue"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "football_statistic" ADD CONSTRAINT "FK_c0b223bee71d6581003b654cb3d" FOREIGN KEY ("match_id") REFERENCES "match"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "football_statistic" ADD CONSTRAINT "FK_0b876e3a4ee26868cacaf4732f7" FOREIGN KEY ("player_id") REFERENCES "player"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "football_statistic" ADD CONSTRAINT "FK_9a41f7c20d8221fa75ba5d02b94" FOREIGN KEY ("team_id") REFERENCES "team"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "basketball_league" ADD CONSTRAINT "FK_f9e0836a9b8227bd82dfef9113a" FOREIGN KEY ("country_id") REFERENCES "country"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "basketball_league" ADD CONSTRAINT "FK_bb0a1dd370a2f97352c2a7c6fc4" FOREIGN KEY ("sport_type_id") REFERENCES "sport_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "basketball_odd" ADD CONSTRAINT "FK_9c51f26c6c872f124b4bc69e70c" FOREIGN KEY ("bookmaker_id") REFERENCES "bookmaker"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "basketball_odd" ADD CONSTRAINT "FK_e612cadc97dc301b8efbaf60d08" FOREIGN KEY ("match_id") REFERENCES "match"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "basketball_match" ADD CONSTRAINT "FK_eb8c8fbf233e6409ea7399e045c" FOREIGN KEY ("league_id") REFERENCES "basketball_league"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "basketball_match" ADD CONSTRAINT "FK_afb192a5c667f2638aedff86e47" FOREIGN KEY ("team_away_id") REFERENCES "team"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "basketball_match" ADD CONSTRAINT "FK_a4554ea55d171fc9f35a61d4ae2" FOREIGN KEY ("team_home_id") REFERENCES "team"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "team_player" ADD CONSTRAINT "FK_a6f4fcfc1c7229fbcb67c6fb4b2" FOREIGN KEY ("player_id") REFERENCES "player"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "team_player" ADD CONSTRAINT "FK_ac195c6f3ba8962bd9f11cc400d" FOREIGN KEY ("team_id") REFERENCES "team"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "league_season" ADD CONSTRAINT "FK_22620c42e0750778225744ae505" FOREIGN KEY ("league_id") REFERENCES "league"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "league_season" ADD CONSTRAINT "FK_60a080e4eb5604bc67fe37a3d0e" FOREIGN KEY ("season_id") REFERENCES "season"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "basketball_league_season" ADD CONSTRAINT "FK_281eb26ca566287706ded660fe7" FOREIGN KEY ("league_id") REFERENCES "basketball_league"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "basketball_league_season" ADD CONSTRAINT "FK_6ee19081c05bffc23aa86bff2e1" FOREIGN KEY ("season_id") REFERENCES "season"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "basketball_league_season" DROP CONSTRAINT "FK_6ee19081c05bffc23aa86bff2e1"`);
        await queryRunner.query(`ALTER TABLE "basketball_league_season" DROP CONSTRAINT "FK_281eb26ca566287706ded660fe7"`);
        await queryRunner.query(`ALTER TABLE "league_season" DROP CONSTRAINT "FK_60a080e4eb5604bc67fe37a3d0e"`);
        await queryRunner.query(`ALTER TABLE "league_season" DROP CONSTRAINT "FK_22620c42e0750778225744ae505"`);
        await queryRunner.query(`ALTER TABLE "team_player" DROP CONSTRAINT "FK_ac195c6f3ba8962bd9f11cc400d"`);
        await queryRunner.query(`ALTER TABLE "team_player" DROP CONSTRAINT "FK_a6f4fcfc1c7229fbcb67c6fb4b2"`);
        await queryRunner.query(`ALTER TABLE "basketball_match" DROP CONSTRAINT "FK_a4554ea55d171fc9f35a61d4ae2"`);
        await queryRunner.query(`ALTER TABLE "basketball_match" DROP CONSTRAINT "FK_afb192a5c667f2638aedff86e47"`);
        await queryRunner.query(`ALTER TABLE "basketball_match" DROP CONSTRAINT "FK_eb8c8fbf233e6409ea7399e045c"`);
        await queryRunner.query(`ALTER TABLE "basketball_odd" DROP CONSTRAINT "FK_e612cadc97dc301b8efbaf60d08"`);
        await queryRunner.query(`ALTER TABLE "basketball_odd" DROP CONSTRAINT "FK_9c51f26c6c872f124b4bc69e70c"`);
        await queryRunner.query(`ALTER TABLE "basketball_league" DROP CONSTRAINT "FK_bb0a1dd370a2f97352c2a7c6fc4"`);
        await queryRunner.query(`ALTER TABLE "basketball_league" DROP CONSTRAINT "FK_f9e0836a9b8227bd82dfef9113a"`);
        await queryRunner.query(`ALTER TABLE "football_statistic" DROP CONSTRAINT "FK_9a41f7c20d8221fa75ba5d02b94"`);
        await queryRunner.query(`ALTER TABLE "football_statistic" DROP CONSTRAINT "FK_0b876e3a4ee26868cacaf4732f7"`);
        await queryRunner.query(`ALTER TABLE "football_statistic" DROP CONSTRAINT "FK_c0b223bee71d6581003b654cb3d"`);
        await queryRunner.query(`ALTER TABLE "match" DROP CONSTRAINT "FK_21fccb957fc8e428f50c1fa59d0"`);
        await queryRunner.query(`ALTER TABLE "match" DROP CONSTRAINT "FK_77a6478dc4ec1407dea056e3a64"`);
        await queryRunner.query(`ALTER TABLE "match" DROP CONSTRAINT "FK_450109bebd37f9a6041fd81ffcc"`);
        await queryRunner.query(`ALTER TABLE "match" DROP CONSTRAINT "FK_2cf189de1a1a33b002c671010c0"`);
        await queryRunner.query(`ALTER TABLE "match" DROP CONSTRAINT "FK_1ba149d91bd88bf216f27a84ef8"`);
        await queryRunner.query(`ALTER TABLE "match" DROP CONSTRAINT "FK_98634db1f8faed5067d2c83cab3"`);
        await queryRunner.query(`ALTER TABLE "match" DROP CONSTRAINT "FK_5243e7f168b381cf979cd039ec9"`);
        await queryRunner.query(`ALTER TABLE "league" DROP CONSTRAINT "FK_b18404cca582140a255fadf616a"`);
        await queryRunner.query(`ALTER TABLE "week" DROP CONSTRAINT "FK_80850bbbb0a91abe0dab0aec8f8"`);
        await queryRunner.query(`ALTER TABLE "week" DROP CONSTRAINT "FK_cd8d2ec41a3bc36d3e0a2f4c570"`);
        await queryRunner.query(`ALTER TABLE "team" DROP CONSTRAINT "FK_20089c23bf84b8cb502ca31d3d2"`);
        await queryRunner.query(`ALTER TABLE "team" DROP CONSTRAINT "FK_61d5f175df34e436f88cb7f2859"`);
        await queryRunner.query(`ALTER TABLE "round" DROP CONSTRAINT "FK_f57b2632b8f4bea753a691f7469"`);
        await queryRunner.query(`ALTER TABLE "bookmaker" DROP CONSTRAINT "FK_a9ee30ecf6360308d1c9ba3c86c"`);
        await queryRunner.query(`ALTER TABLE "odd" DROP CONSTRAINT "FK_1d526a5f8195521a289b0d2c3a2"`);
        await queryRunner.query(`ALTER TABLE "odd" DROP CONSTRAINT "FK_ece636d6e3aed167e62448b5b67"`);
        await queryRunner.query(`ALTER TABLE "match" ALTER COLUMN "id" SET DEFAULT nextval('match_id_seq2')`);
        await queryRunner.query(`ALTER TABLE "match" ALTER COLUMN "id" DROP DEFAULT`);
        await queryRunner.query(`DROP SEQUENCE "match_id_seq"`);
        await queryRunner.query(`ALTER TABLE "football_statistic" ADD CONSTRAINT "FK_c0b223bee71d6581003b654cb3d" FOREIGN KEY ("match_id") REFERENCES "match"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "odd" ADD CONSTRAINT "FK_1d526a5f8195521a289b0d2c3a2" FOREIGN KEY ("match_id") REFERENCES "match"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "league" ALTER COLUMN "id" SET DEFAULT nextval('league_id_seq2')`);
        await queryRunner.query(`ALTER TABLE "league" ALTER COLUMN "id" DROP DEFAULT`);
        await queryRunner.query(`DROP SEQUENCE "league_id_seq"`);
        await queryRunner.query(`ALTER TABLE "week" ADD CONSTRAINT "FK_cd8d2ec41a3bc36d3e0a2f4c570" FOREIGN KEY ("league_id") REFERENCES "league"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "round" ADD CONSTRAINT "FK_f57b2632b8f4bea753a691f7469" FOREIGN KEY ("league_id") REFERENCES "league"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "team" ADD CONSTRAINT "FK_61d5f175df34e436f88cb7f2859" FOREIGN KEY ("league_id") REFERENCES "league"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "match" ADD CONSTRAINT "FK_5243e7f168b381cf979cd039ec9" FOREIGN KEY ("league_id") REFERENCES "league"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "league_season" ADD CONSTRAINT "FK_22620c42e0750778225744ae505" FOREIGN KEY ("league_id") REFERENCES "league"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "season" ALTER COLUMN "id" SET DEFAULT nextval('season_id_seq2')`);
        await queryRunner.query(`ALTER TABLE "season" ALTER COLUMN "id" DROP DEFAULT`);
        await queryRunner.query(`DROP SEQUENCE "season_id_seq"`);
        await queryRunner.query(`ALTER TABLE "week" ADD CONSTRAINT "FK_80850bbbb0a91abe0dab0aec8f8" FOREIGN KEY ("season_id") REFERENCES "season"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "league_season" ADD CONSTRAINT "FK_60a080e4eb5604bc67fe37a3d0e" FOREIGN KEY ("season_id") REFERENCES "season"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "week" ALTER COLUMN "id" SET DEFAULT nextval('week_id_seq2')`);
        await queryRunner.query(`ALTER TABLE "week" ALTER COLUMN "id" DROP DEFAULT`);
        await queryRunner.query(`DROP SEQUENCE "week_id_seq"`);
        await queryRunner.query(`ALTER TABLE "team" ALTER COLUMN "id" SET DEFAULT nextval('team_id_seq2')`);
        await queryRunner.query(`ALTER TABLE "team" ALTER COLUMN "id" DROP DEFAULT`);
        await queryRunner.query(`DROP SEQUENCE "team_id_seq"`);
        await queryRunner.query(`ALTER TABLE "football_statistic" ADD CONSTRAINT "FK_9a41f7c20d8221fa75ba5d02b94" FOREIGN KEY ("team_id") REFERENCES "team"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "match" ADD CONSTRAINT "FK_450109bebd37f9a6041fd81ffcc" FOREIGN KEY ("team_away_id") REFERENCES "team"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "team_player" ADD CONSTRAINT "FK_ac195c6f3ba8962bd9f11cc400d" FOREIGN KEY ("team_id") REFERENCES "team"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "player" ALTER COLUMN "id" SET DEFAULT nextval('player_id_seq2')`);
        await queryRunner.query(`ALTER TABLE "player" ALTER COLUMN "id" DROP DEFAULT`);
        await queryRunner.query(`DROP SEQUENCE "player_id_seq"`);
        await queryRunner.query(`ALTER TABLE "football_statistic" ADD CONSTRAINT "FK_0b876e3a4ee26868cacaf4732f7" FOREIGN KEY ("player_id") REFERENCES "player"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "match" ADD CONSTRAINT "FK_98634db1f8faed5067d2c83cab3" FOREIGN KEY ("player_1_id") REFERENCES "player"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "team_player" ADD CONSTRAINT "FK_a6f4fcfc1c7229fbcb67c6fb4b2" FOREIGN KEY ("player_id") REFERENCES "player"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "venue" ALTER COLUMN "id" SET DEFAULT nextval('venue_id_seq2')`);
        await queryRunner.query(`ALTER TABLE "venue" ALTER COLUMN "id" DROP DEFAULT`);
        await queryRunner.query(`DROP SEQUENCE "venue_id_seq"`);
        await queryRunner.query(`ALTER TABLE "team" ADD CONSTRAINT "FK_20089c23bf84b8cb502ca31d3d2" FOREIGN KEY ("venue_id") REFERENCES "venue"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "match" ADD CONSTRAINT "FK_21fccb957fc8e428f50c1fa59d0" FOREIGN KEY ("venue_id") REFERENCES "venue"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "round" ALTER COLUMN "id" SET DEFAULT nextval('round_id_seq2')`);
        await queryRunner.query(`ALTER TABLE "round" ALTER COLUMN "id" DROP DEFAULT`);
        await queryRunner.query(`DROP SEQUENCE "round_id_seq"`);
        await queryRunner.query(`ALTER TABLE "match" ADD CONSTRAINT "FK_2cf189de1a1a33b002c671010c0" FOREIGN KEY ("round_id") REFERENCES "round"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "country" ALTER COLUMN "id" SET DEFAULT nextval('country_id_seq2')`);
        await queryRunner.query(`ALTER TABLE "country" ALTER COLUMN "id" DROP DEFAULT`);
        await queryRunner.query(`DROP SEQUENCE "country_id_seq"`);
        await queryRunner.query(`ALTER TABLE "league" ADD CONSTRAINT "FK_b18404cca582140a255fadf616a" FOREIGN KEY ("country_id") REFERENCES "country"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "bookmaker" ADD CONSTRAINT "FK_a9ee30ecf6360308d1c9ba3c86c" FOREIGN KEY ("country_id") REFERENCES "country"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "bookmaker" ALTER COLUMN "id" SET DEFAULT nextval('bookmaker_id_seq1')`);
        await queryRunner.query(`ALTER TABLE "bookmaker" ALTER COLUMN "id" DROP DEFAULT`);
        await queryRunner.query(`DROP SEQUENCE "bookmaker_id_seq"`);
        await queryRunner.query(`ALTER TABLE "odd" ADD CONSTRAINT "FK_ece636d6e3aed167e62448b5b67" FOREIGN KEY ("bookmaker_id") REFERENCES "bookmaker"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "odd" ALTER COLUMN "id" SET DEFAULT nextval('odd_id_seq2')`);
        await queryRunner.query(`ALTER TABLE "odd" ALTER COLUMN "id" DROP DEFAULT`);
        await queryRunner.query(`DROP SEQUENCE "odd_id_seq"`);
        await queryRunner.query(`ALTER TABLE "match" ADD "sport_type_id" integer`);
        await queryRunner.query(`ALTER TABLE "team" ADD "sport_type_id" integer`);
        await queryRunner.query(`ALTER TABLE "team" ADD "country_id" integer`);
        await queryRunner.query(`ALTER TABLE "player" ADD "sport_type_id" integer`);
        await queryRunner.query(`ALTER TABLE "player" ADD "country_id" integer`);
        await queryRunner.query(`ALTER TABLE "venue" ADD "country_id" integer`);
        await queryRunner.query(`ALTER TABLE "odd" ADD "sport_type_id" integer`);
        await queryRunner.query(`DROP INDEX "public"."IDX_6ee19081c05bffc23aa86bff2e"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_281eb26ca566287706ded660fe"`);
        await queryRunner.query(`DROP TABLE "basketball_league_season"`);
        await queryRunner.query(`DROP INDEX "public"."basketball_match_pkey"`);
        await queryRunner.query(`DROP INDEX "public"."basketball_match_slug_idx"`);
        await queryRunner.query(`DROP TABLE "basketball_match"`);
        await queryRunner.query(`DROP INDEX "public"."basketball_odd_bookmaker_id_idx"`);
        await queryRunner.query(`DROP INDEX "public"."basketball_odd_match_id_bookmaker_id_idx"`);
        await queryRunner.query(`DROP INDEX "public"."basketball_odd_pkey"`);
        await queryRunner.query(`DROP INDEX "public"."basketball_odd_match_id_idx"`);
        await queryRunner.query(`DROP TABLE "basketball_odd"`);
        await queryRunner.query(`DROP INDEX "public"."basketball_league_pkey"`);
        await queryRunner.query(`DROP INDEX "public"."basketball_league_slug_idx"`);
        await queryRunner.query(`DROP TABLE "basketball_league"`);
        await queryRunner.query(`ALTER TABLE "match" ADD CONSTRAINT "FK_aa32fa685d5628fdb0e1f39ec1c" FOREIGN KEY ("sport_type_id") REFERENCES "sport_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "team" ADD CONSTRAINT "FK_a0187e96dfe350636f3f406b889" FOREIGN KEY ("sport_type_id") REFERENCES "sport_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "team" ADD CONSTRAINT "FK_257d535157033a6d062a0f217b7" FOREIGN KEY ("country_id") REFERENCES "country"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "player" ADD CONSTRAINT "FK_384073bf7e1a0f7e28918e3528e" FOREIGN KEY ("sport_type_id") REFERENCES "sport_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "player" ADD CONSTRAINT "FK_90bf8f82860a6ff540c8422f318" FOREIGN KEY ("country_id") REFERENCES "country"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "venue" ADD CONSTRAINT "FK_8c897a19adb4731787ce50fc657" FOREIGN KEY ("country_id") REFERENCES "country"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "odd" ADD CONSTRAINT "FK_9ac43018bc2ccef004a553f56a9" FOREIGN KEY ("sport_type_id") REFERENCES "sport_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
