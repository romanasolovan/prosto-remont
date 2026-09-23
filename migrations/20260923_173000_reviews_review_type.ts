import {
  type MigrateDownArgs,
  type MigrateUpArgs,
  sql,
} from "@payloadcms/db-postgres";

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    CREATE TYPE "public"."enum_reviews_review_type"
      AS ENUM('written', 'video');

    ALTER TABLE "reviews"
      ADD COLUMN "review_type" "public"."enum_reviews_review_type",
      ADD COLUMN "video_card_image_id" integer,
      ADD COLUMN "video_source_url" varchar,
      ADD COLUMN "video_note" varchar;

    UPDATE "reviews"
    SET "review_type" =
      CASE
        WHEN "video_source" IN ('upload', 'instagram')
          THEN 'video'::"public"."enum_reviews_review_type"
        ELSE 'written'::"public"."enum_reviews_review_type"
      END;

    UPDATE "reviews"
    SET
      "video_source_url" = "instagram_url",
      "video_card_image_id" = "instagram_poster_id"
    WHERE
      "instagram_url" IS NOT NULL
      OR "instagram_poster_id" IS NOT NULL;

    DO $$
    BEGIN
      IF EXISTS (
        SELECT 1
        FROM "reviews"
        WHERE "review_type" IS NULL
      ) THEN
        RAISE EXCEPTION
          'Review migration failed: one or more reviews have no review_type';
      END IF;

      IF EXISTS (
        SELECT 1
        FROM "reviews"
        WHERE "video_source" IN ('upload', 'instagram')
          AND "review_type" <> 'video'
      ) THEN
        RAISE EXCEPTION
          'Review migration failed: a legacy video review was not classified as video';
      END IF;
    END
    $$;

    ALTER TABLE "reviews"
      ALTER COLUMN "review_type" SET DEFAULT 'written',
      ALTER COLUMN "review_type" SET NOT NULL,
      ALTER COLUMN "comment" DROP NOT NULL,
      ALTER COLUMN "original_language" DROP NOT NULL;

    ALTER TABLE "reviews"
      ADD CONSTRAINT "reviews_video_card_image_id_media_id_fk"
      FOREIGN KEY ("video_card_image_id")
      REFERENCES "public"."media"("id")
      ON DELETE SET NULL
      ON UPDATE NO ACTION;

    CREATE INDEX "reviews_video_card_image_idx"
      ON "reviews" USING btree ("video_card_image_id");

    ALTER TABLE "reviews"
      DROP COLUMN "video_source",
      DROP COLUMN "instagram_url",
      DROP COLUMN "instagram_poster_id";

    DROP TYPE "public"."enum_reviews_video_source";
  `);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    CREATE TYPE "public"."enum_reviews_video_source"
      AS ENUM('none', 'upload', 'instagram');

    ALTER TABLE "reviews"
      ADD COLUMN "video_source"
        "public"."enum_reviews_video_source"
        DEFAULT 'none'
        NOT NULL,
      ADD COLUMN "instagram_url" varchar,
      ADD COLUMN "instagram_poster_id" integer;

    UPDATE "reviews"
    SET
      "video_source" =
        CASE
          WHEN "review_type" = 'video'
            THEN 'upload'::"public"."enum_reviews_video_source"
          ELSE 'none'::"public"."enum_reviews_video_source"
        END,
      "instagram_url" = "video_source_url",
      "instagram_poster_id" = "video_card_image_id";

    UPDATE "reviews"
    SET
      "comment" = COALESCE("comment", ''),
      "original_language" = COALESCE(
        "original_language",
        'en'::"public"."enum_reviews_original_language"
      );

    ALTER TABLE "reviews"
      ALTER COLUMN "comment" SET NOT NULL,
      ALTER COLUMN "original_language" SET NOT NULL;

    ALTER TABLE "reviews"
      ADD CONSTRAINT "reviews_instagram_poster_id_media_id_fk"
      FOREIGN KEY ("instagram_poster_id")
      REFERENCES "public"."media"("id")
      ON DELETE SET NULL
      ON UPDATE NO ACTION;

    CREATE INDEX "reviews_instagram_poster_idx"
      ON "reviews" USING btree ("instagram_poster_id");

    ALTER TABLE "reviews"
      DROP COLUMN "review_type",
      DROP COLUMN "video_card_image_id",
      DROP COLUMN "video_source_url",
      DROP COLUMN "video_note";

    DROP TYPE "public"."enum_reviews_review_type";
  `);
}