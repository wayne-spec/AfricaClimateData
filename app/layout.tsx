import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import Providers from "./providers"
import GateWrapper from "@/components/gate-wrapper"

export const metadata: Metadata = {
  title: "Africa Climate & Nature Data Platform",
  description: "Bridging Climate Science with Data Analytics",
    generator: 'v0.dev'
}

// Trim accidental KEY=value and quotes from env values
function sanitizePk(value: string | undefined | null): string {
  if (!value) return ""
  return value
    .trim()
    .replace(/^([A-Z0-9_]+)=/i, "")
    .replace(/^['"]|['"]$/g, "")
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // Prefer NEXT_PUBLIC_ so it’s safe to use on the client
  const rawPk = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || process.env.CLERK_PUBLISHABLE_KEY || ""
  const publishableKey = sanitizePk(rawPk)
  const hasValidPk = publishableKey.startsWith("pk_")

  return (
    <html lang="en">
      <body>
        {hasValidPk ? (
          <Providers publishableKey={publishableKey}>
            <GateWrapper>{children}</GateWrapper>
          </Providers>
        ) : (
          <div className="min-h-screen flex items-center justify-center p-6">
            <div className="max-w-xl w-full space-y-4 text-center">
              <h1 className="text-2xl font-semibold">Clerk is not configured</h1>
              <p className="text-muted-foreground">
                Missing or invalid NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY. Set it to your pk_... value in your Vercel Project
                environment variables for this preview. Locally, .env.local is supported.
              </p>
              <p className="text-sm text-muted-foreground">
                After setting the variable, redeploy and refresh this preview. Client-accessible env vars must be
                prefixed with NEXT_PUBLIC.
              </p>
            </div>
          </div>
        )}
      </body>
    </html>
  )
}
