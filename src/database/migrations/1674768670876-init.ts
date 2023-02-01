import { MigrationInterface, QueryRunner } from 'typeorm';

export class init1674768670876 implements MigrationInterface {
  name = 'init1674768670876';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "venue" ("id" SERIAL NOT NULL, "name" text, "address" text, "city" character varying(50), "surface" character varying(50), "image_url" text, "capacity" smallint, "provider_id" character varying(50), "timestamp" TIMESTAMP WITH TIME ZONE DEFAULT now(), "slug" text, "s3_image_url" text, "country_id" integer, CONSTRAINT "PK_c53deb6d1bcb088f9d459e7dbc0" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "venue_slug_idx" ON "venue" ("slug") `,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "venue_pkey" ON "venue" ("id") `,
    );
    await queryRunner.query(
      `CREATE TABLE "team_player" ("id" SERIAL NOT NULL, "team_id" integer NOT NULL, "player_id" integer NOT NULL, CONSTRAINT "PK_e0e94c07a2898080511249550b6" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "team_player_team_id_idx" ON "team_player" ("team_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "team_player_player_id_idx" ON "team_player" ("player_id") `,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "team_player_pkey" ON "team_player" ("id") `,
    );
    await queryRunner.query(
      `CREATE TABLE "team" ("id" SERIAL NOT NULL, "name" character varying(50), "code" character varying(50), "logo_url" text, "provider_id" character varying(50), "founded" smallint, "national" boolean, "timestamp" TIMESTAMP WITH TIME ZONE DEFAULT now(), "slug" text, "s3_logo_url" text, "country_id" integer, "league_id" integer, "sport_type_id" integer, "venue_id" integer, CONSTRAINT "PK_f57d8293406df4af348402e4b74" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`CREATE INDEX "team_slug_idx" ON "team" ("slug") `);
    await queryRunner.query(
      `CREATE UNIQUE INDEX "team_pkey" ON "team" ("id") `,
    );
    await queryRunner.query(
      `CREATE TABLE "sport_type" ("id" SERIAL NOT NULL, "name" character varying(50), "slug" text, CONSTRAINT "PK_535b2e60d204c943cedec8c9cfe" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "sport_type_slug_idx" ON "sport_type" ("slug") `,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "sport_type_pkey" ON "sport_type" ("id") `,
    );
    await queryRunner.query(
      `CREATE TABLE "player" ("id" SERIAL NOT NULL, "name" character varying(50), "firstname" character varying(50), "lastname" character varying(50), "age" smallint, "birth" date, "place" character varying(50), "nationality" character varying(50), "is_injured" boolean, "photo_url" text, "statistics" json, "is_coach" boolean, "career" json, "provider_id" character varying(50), "height" text, "weight" text, "timestamp" TIMESTAMP WITH TIME ZONE DEFAULT now(), "slug" text, "s3_photo_url" text, "country_id" integer, "sport_type_id" integer, CONSTRAINT "PK_65edadc946a7faf4b638d5e8885" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "player_slug_idx" ON "player" ("slug") `,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "player_pkey" ON "player" ("id") `,
    );
    await queryRunner.query(
      `CREATE TABLE "football_statistic" ("id" SERIAL NOT NULL, "games_number" smallint, "games_minutes" smallint, "games_position" character varying(50), "games_rating" numeric, "games_captain" boolean, "substitutes_in" smallint, "substitutes_out" smallint, "substitutes_bench" smallint, "shots_total" smallint, "shots_on" smallint, "goals_total" smallint, "goals_conceded" smallint, "goals_assists" smallint, "goals_saves" smallint, "passes_total" smallint, "passes_key" smallint, "passes_accuracy" numeric, "tackles_total" smallint, "tackles_blocks" smallint, "tackles_interceptions" smallint, "duels_total" smallint, "duels_won" smallint, "dribbles_attempts" smallint, "dribbles_success" smallint, "dribbles_past" smallint, "fouls_drawn" smallint, "fouls_committed" smallint, "cards_yellow" smallint, "cards_red" smallint, "penalty_won" smallint, "penalty_commited" smallint, "penalty_scored" smallint, "penalty_missed" smallint, "penalty_saved" smallint, "timestamp" TIMESTAMP WITH TIME ZONE DEFAULT now(), "match_id" integer, "player_id" integer, "team_id" integer, CONSTRAINT "PK_759cb97dc6aa7ac462213070987" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "statistic_pkey" ON "football_statistic" ("id") `,
    );
    await queryRunner.query(
      `CREATE TABLE "round" ("id" SERIAL NOT NULL, "name" character varying(50), "slug" text, "league_id" integer, CONSTRAINT "PK_34bd959f3f4a90eb86e4ae24d2d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "round_slug_idx" ON "round" ("slug") `,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "round_pkey" ON "round" ("id") `,
    );
    await queryRunner.query(
      `CREATE TABLE "match" ("id" SERIAL NOT NULL, "date" TIMESTAMP WITH TIME ZONE, "weather" character varying(50), "referee" text, "match_score_home" smallint, "match_score_away" smallint, "elapsed" smallint, "status_short" character varying(5), "statistics" json, "is_live" boolean, "provider_id" character varying(50), "timestamp" TIMESTAMP WITH TIME ZONE DEFAULT now(), "slug" text, "league_id" integer, "player_1_id" integer, "player_2_id" integer, "round_id" integer, "sport_type_id" integer, "team_away_id" integer, "team_home_id" integer, "venue_id" integer, CONSTRAINT "PK_92b6c3a6631dd5b24a67c69f69d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "match_slug_idx" ON "match" ("slug") `,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "match_pkey" ON "match" ("id") `,
    );
    await queryRunner.query(
      `CREATE TABLE "odd" ("id" SERIAL NOT NULL, "match_id" integer, "bookmaker_id" integer, "name" character varying(50), "value" character varying(50), "handicap" integer, "is_main" boolean, "is_suspended" boolean, "odd" numeric, "provider_id" character varying(50), "timestamp" TIMESTAMP WITH TIME ZONE DEFAULT now(), "sport_type_id" integer, CONSTRAINT "PK_0c8cc40afd45ec76ef50e32274d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "odd_match_id_idx" ON "odd" ("match_id") `,
    );
    await queryRunner.query(`CREATE UNIQUE INDEX "odd_pkey" ON "odd" ("id") `);
    await queryRunner.query(
      `CREATE INDEX "odd_match_id_bookmaker_id_idx" ON "odd" ("bookmaker_id", "match_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "odd_bookmaker_id_idx" ON "odd" ("bookmaker_id") `,
    );
    await queryRunner.query(
      `CREATE TABLE "bookmaker" ("id" SERIAL NOT NULL, "name" character varying(50) NOT NULL, "logo" text, "rank" numeric, "user_rank" numeric, "avg_payout" numeric, "payout_speed" numeric, "overview" json, "bonus_offer" json, "provider_id" character varying(50), "timestamp" TIMESTAMP WITH TIME ZONE DEFAULT now(), "slug" text, "s3_logo_url" text, "rating" numeric, "aff_link" text, "high_payout" boolean, "live_stream" boolean, "bet_builder" boolean, "cash_out" boolean, "live_chat" boolean, "casino" boolean, "poker" boolean, "mobile" boolean, "android" boolean, "ios" boolean, "support_email" boolean, "support_phone" boolean, "description" text, "country_id" integer, CONSTRAINT "PK_a53596285659d31632a10cc6d6e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "bookmaker_slug_idx" ON "bookmaker" ("slug") `,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "pk_1" ON "bookmaker" ("id") `,
    );
    await queryRunner.query(
      `CREATE TABLE "country" ("id" SERIAL NOT NULL, "name" character varying(50), "code" character varying(50), "flag_url" text, "slug" text, "s3_flag_url" text, CONSTRAINT "PK_bf6e37c231c4f4ea56dcd887269" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "country_slug_idx" ON "country" ("slug") `,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "country_pkey" ON "country" ("id") `,
    );
    await queryRunner.query(
      `CREATE TABLE "season" ("id" SERIAL NOT NULL, "year" smallint, "start" character varying(50), "end" character varying(50), "timestamp" TIMESTAMP WITH TIME ZONE DEFAULT now(), "slug" text, CONSTRAINT "PK_8ac0d081dbdb7ab02d166bcda9f" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "season_slug_idx" ON "season" ("slug") `,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "season_pkey" ON "season" ("id") `,
    );
    await queryRunner.query(
      `CREATE TABLE "week" ("id" SERIAL NOT NULL, "timestamp" TIMESTAMP WITH TIME ZONE, "is_current" boolean, "league_id" integer, "season_id" integer, CONSTRAINT "PK_1f85dfadd5f363a1d0bce2b9664" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "week_pkey" ON "week" ("id") `,
    );
    await queryRunner.query(
      `CREATE TABLE "league" ("id" SERIAL NOT NULL, "name" text, "type" character varying(50), "logo_url" text, "provider_id" character varying(50), "timestamp" TIMESTAMP WITH TIME ZONE DEFAULT now(), "standings" json, "slug" text, "s3_logo_url" text, "description" text, "season_start" TIMESTAMP WITH TIME ZONE, "season_end" TIMESTAMP WITH TIME ZONE, "country_id" integer, "sport_type_id" integer, CONSTRAINT "PK_0bd74b698f9e28875df738f7864" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "league_slug_idx" ON "league" ("slug") `,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "league_pkey" ON "league" ("id") `,
    );
    await queryRunner.query(
      `CREATE TABLE "league_season" ("id" SERIAL NOT NULL, "league_id" integer, "season_id" integer, CONSTRAINT "PK_8509486b3c5a3e4cf82a1a4b462" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "league_season_pkey" ON "league_season" ("id") `,
    );
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
    await queryRunner.query(`DROP INDEX "public"."league_season_pkey"`);
    await queryRunner.query(`DROP TABLE "league_season"`);
    await queryRunner.query(`DROP INDEX "public"."league_pkey"`);
    await queryRunner.query(`DROP INDEX "public"."league_slug_idx"`);
    await queryRunner.query(`DROP TABLE "league"`);
    await queryRunner.query(`DROP INDEX "public"."week_pkey"`);
    await queryRunner.query(`DROP TABLE "week"`);
    await queryRunner.query(`DROP INDEX "public"."season_pkey"`);
    await queryRunner.query(`DROP INDEX "public"."season_slug_idx"`);
    await queryRunner.query(`DROP TABLE "season"`);
    await queryRunner.query(`DROP INDEX "public"."country_pkey"`);
    await queryRunner.query(`DROP INDEX "public"."country_slug_idx"`);
    await queryRunner.query(`DROP TABLE "country"`);
    await queryRunner.query(`DROP INDEX "public"."pk_1"`);
    await queryRunner.query(`DROP INDEX "public"."bookmaker_slug_idx"`);
    await queryRunner.query(`DROP TABLE "bookmaker"`);
    await queryRunner.query(`DROP INDEX "public"."odd_bookmaker_id_idx"`);
    await queryRunner.query(
      `DROP INDEX "public"."odd_match_id_bookmaker_id_idx"`,
    );
    await queryRunner.query(`DROP INDEX "public"."odd_pkey"`);
    await queryRunner.query(`DROP INDEX "public"."odd_match_id_idx"`);
    await queryRunner.query(`DROP TABLE "odd"`);
    await queryRunner.query(`DROP INDEX "public"."match_pkey"`);
    await queryRunner.query(`DROP INDEX "public"."match_slug_idx"`);
    await queryRunner.query(`DROP TABLE "match"`);
    await queryRunner.query(`DROP INDEX "public"."round_pkey"`);
    await queryRunner.query(`DROP INDEX "public"."round_slug_idx"`);
    await queryRunner.query(`DROP TABLE "round"`);
    await queryRunner.query(`DROP INDEX "public"."statistic_pkey"`);
    await queryRunner.query(`DROP TABLE "football_statistic"`);
    await queryRunner.query(`DROP INDEX "public"."player_pkey"`);
    await queryRunner.query(`DROP INDEX "public"."player_slug_idx"`);
    await queryRunner.query(`DROP TABLE "player"`);
    await queryRunner.query(`DROP INDEX "public"."sport_type_pkey"`);
    await queryRunner.query(`DROP INDEX "public"."sport_type_slug_idx"`);
    await queryRunner.query(`DROP TABLE "sport_type"`);
    await queryRunner.query(`DROP INDEX "public"."team_pkey"`);
    await queryRunner.query(`DROP INDEX "public"."team_slug_idx"`);
    await queryRunner.query(`DROP TABLE "team"`);
    await queryRunner.query(`DROP INDEX "public"."team_player_pkey"`);
    await queryRunner.query(`DROP INDEX "public"."team_player_player_id_idx"`);
    await queryRunner.query(`DROP INDEX "public"."team_player_team_id_idx"`);
    await queryRunner.query(`DROP TABLE "team_player"`);
    await queryRunner.query(`DROP INDEX "public"."venue_pkey"`);
    await queryRunner.query(`DROP INDEX "public"."venue_slug_idx"`);
    await queryRunner.query(`DROP TABLE "venue"`);
  }
}
