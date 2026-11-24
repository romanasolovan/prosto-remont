import {
  type MigrateUpArgs,
  type MigrateDownArgs,
  sql,
} from "@payloadcms/db-postgres";

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    SET LOCAL lock_timeout = '5s';
    SET LOCAL statement_timeout = '30s';

    ALTER TABLE "reviews"
      ADD COLUMN "order" numeric DEFAULT 0;
  `);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    SET LOCAL lock_timeout = '5s';
    SET LOCAL statement_timeout = '30s';

    ALTER TABLE "reviews"
      DROP COLUMN "order";
  `);
}