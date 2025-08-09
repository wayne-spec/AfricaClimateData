"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { Menu, X, ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { topics } from "@/lib/data"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const [expandedSection, setExpandedSection] = useState<string | null>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()

  const toggleMenu = () => setIsOpen(!isOpen)

  const toggleSection = (section: string) => {
    if (expandedSection === section) {
      setExpandedSection(null)
    } else {
      setExpandedSection(section)
    }
  }

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen])

  // Close menu on navigation
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  // Check if a link is active
  const isActive = (path: string) => {
    if (path === "/") return pathname === "/"
    return pathname.startsWith(path)
  }

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }

    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isOpen])

  return (
    <div className="md:hidden" ref={menuRef}>
      <Button variant="ghost" size="icon" onClick={toggleMenu} className="text-white">
        <Menu className="h-6 w-6" />
        <span className="sr-only">Toggle menu</span>
      </Button>

      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50">
          <div className="fixed right-0 top-0 h-full w-4/5 max-w-sm bg-[#0A5D22] text-white shadow-lg overflow-y-auto">
            <div className="flex justify-between items-center p-4 border-b border-green-800">
              <h2 className="font-bold text-lg">Menu</h2>
              <Button variant="ghost" size="icon" onClick={toggleMenu} className="text-white hover:bg-green-800">
                <X className="h-6 w-6" />
                <span className="sr-only">Close menu</span>
              </Button>
            </div>

            <div className="overflow-y-auto h-full pb-20">
              <div className="p-4 border-b border-green-800">
                <button
                  className="flex justify-between items-center w-full py-2 text-white hover:text-green-200 transition-colors"
                  onClick={() => toggleSection("topics")}
                  aria-expanded={expandedSection === "topics"}
                >
                  <span className="font-medium">Browse by topic</span>
                  <span>
                    {expandedSection === "topics" ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </span>
                </button>

                {expandedSection === "topics" && (
                  <div className="ml-4 mt-2 space-y-2">
                    {topics.map((topic) => (
                      <Link
                        key={topic.id}
                        href={`/topics/${topic.id}`}
                        className={cn(
                          "block py-1 text-sm text-white hover:text-green-200 transition-colors",
                          isActive(`/topics/${topic.id}`) ? "text-green-200 font-medium" : "",
                        )}
                      >
                        {topic.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link
                href="/data"
                className={cn(
                  "block p-4 border-b border-green-800 hover:bg-green-800 transition-colors",
                  isActive("/data") ? "bg-green-900 font-medium" : "",
                )}
              >
                Data
              </Link>

              <Link
                href="/dashboards"
                className={cn(
                  "block p-4 border-b border-green-800 hover:bg-green-800 transition-colors",
                  isActive("/dashboards") ? "bg-green-900 font-medium" : "",
                )}
              >
                Dashboards
              </Link>

              <Link
                href="/nature-data"
                className={cn(
                  "block p-4 border-b border-green-800 hover:bg-green-800 transition-colors",
                  isActive("/nature-data") ? "bg-green-900 font-medium" : "",
                )}
              >
                Nature Data
              </Link>

              <Link
                href="/insights"
                className={cn(
                  "block p-4 border-b border-green-800 hover:bg-green-800 transition-colors",
                  isActive("/insights") ? "bg-green-900 font-medium" : "",
                )}
              >
                Insights
              </Link>

              <div className="p-4 border-b border-green-800">
                <button
                  className="flex justify-between items-center w-full py-2 text-white hover:text-green-200 transition-colors"
                  onClick={() => toggleSection("resources")}
                  aria-expanded={expandedSection === "resources"}
                >
                  <span className="font-medium">Resources</span>
                  <span>
                    {expandedSection === "resources" ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </span>
                </button>

                {expandedSection === "resources" && (
                  <div className="ml-4 mt-2 space-y-2">
                    <Link
                      href="/resources/teaching"
                      className="block py-1 text-sm text-white hover:text-green-200 transition-colors"
                    >
                      Teaching Hub
                    </Link>
                    <Link
                      href="/resources/data-explorer"
                      className="block py-1 text-sm text-white hover:text-green-200 transition-colors"
                    >
                      Data Explorer
                    </Link>
                    <Link
                      href="/resources/papers"
                      className="block py-1 text-sm text-white hover:text-green-200 transition-colors"
                    >
                      Research Papers
                    </Link>
                    <Link
                      href="/resources/charts"
                      className="block py-1 text-sm text-white hover:text-green-200 transition-colors"
                    >
                      Charts & Maps
                    </Link>
                    <Link
                      href="/resources/api"
                      className="block py-1 text-sm text-white hover:text-green-200 transition-colors"
                    >
                      API Documentation
                    </Link>
                  </div>
                )}
              </div>

              <div className="p-4 border-b border-green-800">
                <button
                  className="flex justify-between items-center w-full py-2 text-white hover:text-green-200 transition-colors"
                  onClick={() => toggleSection("about")}
                  aria-expanded={expandedSection === "about"}
                >
                  <span className="font-medium">About</span>
                  <span>
                    {expandedSection === "about" ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </span>
                </button>

                {expandedSection === "about" && (
                  <div className="ml-4 mt-2 space-y-2">
                    <Link
                      href="/mission"
                      className="block py-1 text-sm text-white hover:text-green-200 transition-colors"
                    >
                      Our Mission
                    </Link>
                    <Link
                      href="/mission/team"
                      className="block py-1 text-sm text-white hover:text-green-200 transition-colors"
                    >
                      Our Team
                    </Link>
                    <Link
                      href="/mission/funding"
                      className="block py-1 text-sm text-white hover:text-green-200 transition-colors"
                    >
                      Funding
                    </Link>
                    <Link
                      href="/mission/careers"
                      className="block py-1 text-sm text-white hover:text-green-200 transition-colors"
                    >
                      Careers
                    </Link>
                    <Link
                      href="/mission/contact"
                      className="block py-1 text-sm text-white hover:text-green-200 transition-colors"
                    >
                      Contact
                    </Link>
                    <Link
                      href="/mission/faq"
                      className="block py-1 text-sm text-white hover:text-green-200 transition-colors"
                    >
                      FAQs
                    </Link>
                  </div>
                )}
              </div>

              <div className="p-4 space-y-3 sticky bottom-0 bg-[#0A5D22] shadow-md border-t border-green-800">
                <Button
                  variant="outline"
                  className="w-full border-white text-white hover:bg-white hover:text-[#0A5D22]"
                >
                  Subscribe
                </Button>
                <Button className="w-full bg-africa-red hover:bg-red-700 text-white">Donate</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
