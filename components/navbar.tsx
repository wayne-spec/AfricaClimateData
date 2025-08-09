"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import TopicsDropdown from "./topics-dropdown"
import DropdownMenu from "./dropdown-menu"
import MobileMenu from "./mobile-menu"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  // Track scroll position to add shadow on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Define dropdown menu items
  const resourcesItems = [
    { label: "Teaching Hub", href: "/resources/teaching" },
    { label: "Data Explorer", href: "/resources/data-explorer" },
    { label: "Research Papers", href: "/resources/papers" },
    { label: "Charts & Maps", href: "/resources/charts" },
    { label: "API Documentation", href: "/resources/api" },
    { label: "Dashboards", href: "/dashboards" },
  ]

  const aboutItems = [
    { label: "Our Mission", href: "/mission" },
    { label: "Our Team", href: "/mission/team" },
    { label: "Funding", href: "/mission/funding" },
    { label: "Careers", href: "/mission/careers" },
    { label: "Contact", href: "/mission/contact" },
    { label: "FAQs", href: "/mission/faq" },
  ]

  // Check if a link is active
  const isActive = (path: string) => {
    if (path === "/") return pathname === "/"
    return pathname.startsWith(path)
  }

  return (
    <header
      className={cn(
        "sticky top-0 z-50 bg-[#0A5D22] text-white border-b-4 border-[#ce261e] transition-shadow duration-300",
        scrolled ? "shadow-md" : "",
      )}
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <div className="w-10 h-10 mr-2 relative sm:w-12 sm:h-12 sm:mr-3">
              <Image
                src="/images/logo.png"
                alt="Africa Climate Data Platform Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="text-base font-bold sm:text-xl">
              <span className="block leading-tight">Africa Climate</span>
              <span className="block leading-tight">Data Platform</span>
            </div>
          </Link>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <MobileMenu />
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:flex md:items-center space-x-6">
            <TopicsDropdown />

            <Link
              href="/data"
              className={cn(
                "text-sm hover:text-green-200 transition-colors",
                isActive("/data") ? "text-green-200 font-medium" : "",
              )}
            >
              Data
            </Link>

            <Link
              href="/dashboards"
              className={cn(
                "text-sm hover:text-green-200 transition-colors",
                isActive("/dashboards") ? "text-green-200 font-medium" : "",
              )}
            >
              Dashboards
            </Link>

            <Link
              href="/nature-data"
              className={cn(
                "text-sm hover:text-green-200 transition-colors",
                isActive("/nature-data") ? "text-green-200 font-medium" : "",
              )}
            >
              Nature Data
            </Link>

            <Link
              href="/insights"
              className={cn(
                "text-sm hover:text-green-200 transition-colors",
                isActive("/insights") ? "text-green-200 font-medium" : "",
              )}
            >
              Insights
            </Link>

            <DropdownMenu label="Resources" items={resourcesItems} />
            <DropdownMenu label="About" items={aboutItems} />

            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                className="text-white border-white hover:bg-white hover:text-[#0A5D22]"
              >
                Subscribe
              </Button>
              <Button size="sm" className="bg-africa-red hover:bg-red-700 text-white">
                Donate
              </Button>
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}
