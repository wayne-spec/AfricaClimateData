"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Check if consent has already been given
    const consentStatus = localStorage.getItem("cookieConsent")
    setVisible(consentStatus !== "accepted" && consentStatus !== "rejected")
  }, [])

  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "accepted")
    setVisible(false)
  }

  const handleReject = () => {
    localStorage.setItem("cookieConsent", "rejected")
    setVisible(false)
  }

  if (!visible) {
    return null
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-yellow-50 p-4 border-t border-yellow-200 z-50">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
        <p className="text-sm text-gray-700 mb-4 md:mb-0">
          We use cookies to give you the best experience on our website. By agreeing, you consent to our use of cookies
          and other analytics tools according to our
          <Link href="/privacy" className="text-africa-green hover:underline ml-1">
            privacy policy
          </Link>
          .
        </p>
        <div className="flex space-x-2">
          <Button variant="outline" className="text-gray-700 border-gray-300" onClick={handleReject}>
            No thanks
          </Button>
          <Button className="bg-africa-green hover:bg-africa-dark-green text-white" onClick={handleAccept}>
            I agree
          </Button>
        </div>
      </div>
    </div>
  )
}
