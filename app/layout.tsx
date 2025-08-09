import type React from "react"
import "./globals.css"
import { ClerkProvider } from "@clerk/nextjs"
import type { Metadata } from "next"
import GateWrapper from "@/components/gate-wrapper"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export const metadata: Metadata = {
  title: "Africa Climate & Nature Data Platform",
  description: "Bridging Climate Science with Data Analytics",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="min-h-screen flex flex-col bg-white text-gray-900">
          <GateWrapper>
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </GateWrapper>
        </body>
      </html>
    </ClerkProvider>
  )
}
