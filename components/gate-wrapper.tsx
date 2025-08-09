"use client"

import type React from "react"

import { SignedIn, SignedOut } from "@clerk/nextjs"
import { usePathname } from "next/navigation"
import AccessGate from "./access-gate"

export default function GateWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname() || "/"

  // Allow Clerk auth pages to render without the gate.
  const isAuthRoute = pathname.startsWith("/sign-in") || pathname.startsWith("/sign-up")

  if (isAuthRoute) return <>{children}</>

  return (
    <>
      <SignedIn>{children}</SignedIn>
      <SignedOut>
        <AccessGate />
      </SignedOut>
    </>
  )
}
