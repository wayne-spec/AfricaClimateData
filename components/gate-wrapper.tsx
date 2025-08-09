"use client"

import type React from "react"

import { SignedIn, SignedOut } from "@clerk/nextjs"
import { usePathname } from "next/navigation"
import AccessGate from "./access-gate"

export default function GateWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  // Allow auth routes to be accessible when signed out
  const isAuthRoute = pathname?.startsWith("/sign-in")

  if (isAuthRoute) {
    return <>{children}</>
  }

  return (
    <>
      <SignedIn>{children}</SignedIn>
      <SignedOut>
        <AccessGate />
      </SignedOut>
    </>
  )
}
