import { default as nextAuthMiddleware } from "next-auth/middleware";

export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/dashboard/:path*", "/create-listing"],
};
