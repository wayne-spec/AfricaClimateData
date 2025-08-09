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
  return (
    <ClerkProvider publishableKey={publishableKey} signInUrl="/sign-in" signUpUrl="/sign-up">
      {children}
    </ClerkProvider>
  )
}
