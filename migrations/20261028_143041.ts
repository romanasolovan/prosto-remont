
import { type MigrateUpArgs, type MigrateDownArgs, sql } from "@payloadcms/db-postgres";

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    CREATE TABLE "projects_gallery_sections" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "title" varchar NOT NULL,
      "slug" varchar NOT NULL,
      "description" varchar
    );

    CREATE TABLE "projects_gallery_sections_media_items" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "media_id" integer NOT NULL,
      "poster_id" integer,
      "caption" varchar,
      "source_url" varchar
    );

    ALTER TABLE "projects_gallery_sections"
      ADD CONSTRAINT "projects_gallery_sections_parent_id_fk"
      FOREIGN KEY ("_parent_id")
      REFERENCES "public"."projects"("id")
      ON DELETE cascade ON UPDATE no action;

    ALTER TABLE "projects_gallery_sections_media_items"
      ADD CONSTRAINT "projects_gallery_sections_media_items_parent_id_fk"
      FOREIGN KEY ("_parent_id")
      REFERENCES "public"."projects_gallery_sections"("id")
      ON DELETE cascade ON UPDATE no action;

    ALTER TABLE "projects_gallery_sections_media_items"
      ADD CONSTRAINT "projects_gallery_sections_media_items_media_id_media_id_fk"
      FOREIGN KEY ("media_id")
      REFERENCES "public"."media"("id")
      ON DELETE no action ON UPDATE no action;

    ALTER TABLE "projects_gallery_sections_media_items"
      ADD CONSTRAINT "projects_gallery_sections_media_items_poster_id_media_id_fk"
      FOREIGN KEY ("poster_id")
      REFERENCES "public"."media"("id")
      ON DELETE set null ON UPDATE no action;

    CREATE INDEX "projects_gallery_sections_order_idx"
      ON "projects_gallery_sections" USING btree ("_order");

    CREATE INDEX "projects_gallery_sections_parent_id_idx"
      ON "projects_gallery_sections" USING btree ("_parent_id");

    CREATE INDEX "projects_gallery_sections_media_items_order_idx"
      ON "projects_gallery_sections_media_items" USING btree ("_order");

    CREATE INDEX "projects_gallery_sections_media_items_parent_id_idx"
      ON "projects_gallery_sections_media_items" USING btree ("_parent_id");

    CREATE INDEX "projects_gallery_sections_media_items_media_idx"
      ON "projects_gallery_sections_media_items" USING btree ("media_id");

    CREATE INDEX "projects_gallery_sections_media_items_poster_idx"
      ON "projects_gallery_sections_media_items" USING btree ("poster_id");

      ALTER TABLE "public"."projects_gallery_sections"
ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."projects_gallery_sections_media_items"
ENABLE ROW LEVEL SECURITY;
  `);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP TABLE "projects_gallery_sections_media_items";
    DROP TABLE "projects_gallery_sections";
  `);
}
