"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { UserButton, useUser } from "@clerk/nextjs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { isSignedIn } = useUser()

  const toggleMenu = () => setIsOpen(!isOpen)

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <Image
                src="/images/logo.png"
                alt="Africa Climate Data Platform"
                width={40}
                height={40}
                className="h-8 w-auto"
              />
              <span className="ml-2 text-xl font-bold text-gray-900">Africa Climate Data</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-green-600 px-3 py-2 text-sm font-medium">
              Home
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center text-gray-700 hover:text-green-600 px-3 py-2 text-sm font-medium">
                Dashboards <ChevronDown className="ml-1 h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem asChild>
                  <Link href="/dashboards">All Dashboards</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/dashboards/climate-finance">Climate Finance</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/dashboards/agriculture">Agriculture</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/dashboards/energy-use">Energy Use</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/dashboards/wildlife">Wildlife</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Link href="/data" className="text-gray-700 hover:text-green-600 px-3 py-2 text-sm font-medium">
              Data
            </Link>

            <Link href="/insights" className="text-gray-700 hover:text-green-600 px-3 py-2 text-sm font-medium">
              Insights
            </Link>

            <Link href="/mission" className="text-gray-700 hover:text-green-600 px-3 py-2 text-sm font-medium">
              Mission
            </Link>

            {isSignedIn && (
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "h-8 w-8",
                  },
                }}
              />
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            {isSignedIn && (
              <div className="mr-2">
                <UserButton
                  appearance={{
                    elements: {
                      avatarBox: "h-8 w-8",
                    },
                  }}
                />
              </div>
            )}
            <Button variant="ghost" size="icon" onClick={toggleMenu} className="text-gray-700">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              <Link
                href="/"
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-green-600"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/dashboards"
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-green-600"
                onClick={() => setIsOpen(false)}
              >
                Dashboards
              </Link>
              <Link
                href="/data"
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-green-600"
                onClick={() => setIsOpen(false)}
              >
                Data
              </Link>
              <Link
                href="/insights"
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-green-600"
                onClick={() => setIsOpen(false)}
              >
                Insights
              </Link>
              <Link
                href="/mission"
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-green-600"
                onClick={() => setIsOpen(false)}
              >
                Mission
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
