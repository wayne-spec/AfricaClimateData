"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { ChevronDown } from "lucide-react"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

interface DropdownItem {
  label: string
  href: string
}

interface DropdownMenuProps {
  label: string
  items: DropdownItem[]
}

export default function DropdownMenu({ label, items }: DropdownMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()

  // Check if any item in the dropdown is active
  const hasActiveItem = items.some((item) => pathname.startsWith(item.href))

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className={cn(
          "flex items-center text-sm hover:text-green-200 focus:outline-none transition-colors",
          hasActiveItem ? "text-green-200 font-medium" : "",
        )}
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => setIsOpen(true)}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {label} <ChevronDown className="ml-1 h-4 w-4" />
      </button>

      {isOpen && (
        <div
          className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50"
          onMouseLeave={() => setIsOpen(false)}
          role="menu"
          aria-orientation="vertical"
        >
          <div className="py-1 max-h-[calc(100vh-100px)] overflow-y-auto">
            {items.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className={cn(
                  "block px-4 py-2 text-sm hover:bg-gray-100 transition-colors",
                  pathname.startsWith(item.href) ? "text-africa-green font-medium bg-gray-50" : "text-gray-700",
                )}
                onClick={() => setIsOpen(false)}
                role="menuitem"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
