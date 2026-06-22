import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import path from "path";
import { buildConfig } from "payload";
import { fileURLToPath } from "url";
import sharp from "sharp";

import { Users } from "./app/collections/users";
import { Media } from "./app/collections/media";
import { QuoteRequests } from "./app/collections/quoteRequests";
import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob";
import { Reviews } from "./app/collections/reviews";
import { Projects } from "./app/collections/projects";
import { Services } from "./app/collections/services";
import { TrustedBrands } from "./app/collections/trustedBrands";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [
    Users,
    Media,
    QuoteRequests,
    Reviews,
    Projects,
    Services,
    TrustedBrands,
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || "",
    },
  }),
  sharp,
  plugins: [
    vercelBlobStorage({
      enabled: true,
      collections: {
        media: true,
      },
      token: process.env.BLOB_READ_WRITE_TOKEN || "",
    }),
  ],
});
