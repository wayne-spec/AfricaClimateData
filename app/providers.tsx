"use client"

import type React from "react"
import { ClerkProvider } from "@clerk/nextjs"

export default function Providers({
  children,
  publishableKey,
}: {
  children: React.ReactNode
  publishableKey: string
}) {
  // Only render Clerk when a valid key is provided by RootLayout
  return (
    <ClerkProvider publishableKey={publishableKey} signInUrl="/sign-in">
      {children}
    </ClerkProvider>
  )
}
