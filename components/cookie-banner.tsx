"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

export function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false)

  useEffect(() => {
    // Check if user has already accepted cookies
    const cookieConsent = localStorage.getItem("cookieConsent")
    if (!cookieConsent) {
      setShowBanner(true)
    }
  }, [])

  const acceptCookies = () => {
    localStorage.setItem("cookieConsent", "accepted")
    setShowBanner(false)
  }

  const declineCookies = () => {
    localStorage.setItem("cookieConsent", "declined")
    setShowBanner(false)
  }

  if (!showBanner) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-4 shadow-lg z-50">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex-1">
          <p className="text-sm">
            We use cookies to enhance your experience on our platform. By continuing to use this site, you agree to our
            use of cookies for analytics and personalization.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={declineCookies}
            className="text-gray-900 border-white hover:bg-gray-100 bg-transparent"
          >
            Decline
          </Button>
          <Button size="sm" onClick={acceptCookies} className="bg-green-600 hover:bg-green-700">
            Accept
          </Button>
          <Button variant="ghost" size="icon" onClick={declineCookies} className="text-white hover:bg-gray-800">
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
