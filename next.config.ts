import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  serverExternalPackages: ["sharp", "@payloadcms/db-postgres", "drizzle-orm"],
};

const withNextIntl = createNextIntlPlugin();
export default withPayload(withNextIntl(nextConfig));
