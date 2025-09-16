// Protect all routes by default using Clerk middleware.
// Public routes: /auth (your landing page) and static assets.
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server"

const isPublicRoute = createRouteMatcher([
  "/auth(.*)",
  "/favicon.ico",
  "/robots.txt",
  "/sitemap.xml",
  "/_next/(.*)",
  "/public/(.*)",
  "/images/(.*)",
  "/assets/(.*)",
])

export default clerkMiddleware((auth, req) => {
  if (!isPublicRoute(req)) {
    // Will redirect to NEXT_PUBLIC_CLERK_SIGN_IN_URL (set to /auth)
    auth().protect()
  }
})

export const config = {
  // Run on all routes except Next internals and file extensions
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
}
