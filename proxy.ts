import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  matcher: [
    /*
     * Match frontend routes only.
     * Exclude API routes, Payload admin, Next.js internals,
     * and files containing an extension.
     */
    "/((?!api|admin|_next|_vercel|.*\\..*).*)",
  ],
};