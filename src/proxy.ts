import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

// next-intl's best-fit matcher already resolves pt, pt-PT and pt-BR to pt-BR (checked for T019).
export default createMiddleware(routing);

export const config = {
  // Skip Next internals and any path with a file extension (PDF, favicon, images).
  matcher: "/((?!api|_next|_vercel|.*\\..*).*)",
};
