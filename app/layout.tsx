import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { ClerkProvider } from "@clerk/nextjs"
import GateWrapper from "@/components/gate-wrapper"

export const metadata: Metadata = {
  title: "Africa Climate & Nature Data Platform",
  description: "Bridging Climate Science with Data Analytics",
    generator: 'v0.dev'
}

function sanitizePk(value: string | undefined | null): string {
  if (!value) return ""
  // Strip accidental KEY=value and surrounding quotes
  const v = value
    .trim()
    .replace(/^([A-Z0-9_]+)=/i, "")
    .replace(/^['"]|['"]$/g, "")
  return v
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // In v0 previews, set NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY in the Vercel Project.
  const rawPk = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || process.env.CLERK_PUBLISHABLE_KEY || ""
  const publishableKey = sanitizePk(rawPk)

  return (
    <ClerkProvider publishableKey={publishableKey}>
      <html lang="en">
        <body>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
            <GateWrapper>{children}</GateWrapper>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
