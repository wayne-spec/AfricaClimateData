"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Share2, LinkIcon, Twitter, Facebook } from "lucide-react"
import { copyToClipboard } from "@/lib/download-utils"

interface ShareButtonProps {
  title: string
  description: string
}

export default function ShareButton({ title, description }: ShareButtonProps) {
  const [showTooltip, setShowTooltip] = useState(false)
  const [copySuccess, setCopySuccess] = useState(false)

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: title,
          text: description,
          url: window.location.href,
        })
        .catch((error) => console.log("Error sharing", error))
    } else {
      setShowTooltip(!showTooltip)
    }
  }

  const handleCopyLink = async () => {
    const success = await copyToClipboard(window.location.href)
    if (success) {
      setCopySuccess(true)
      setTimeout(() => setCopySuccess(false), 2000)
    }
  }

  const handleTwitterShare = () => {
    const text = encodeURIComponent(`${title} - ${description}`)
    const url = encodeURIComponent(window.location.href)
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, "_blank")
  }

  const handleFacebookShare = () => {
    const url = encodeURIComponent(window.location.href)
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, "_blank")
  }

  return (
    <div className="relative">
      <Button variant="outline" onClick={handleShare}>
        <Share2 className="h-4 w-4 mr-2" />
        Share
      </Button>

      {showTooltip && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg z-10 p-4">
          <p className="text-sm mb-2">Share this visualization:</p>
          <div className="flex flex-col space-y-2">
            <Button size="sm" variant="outline" onClick={handleCopyLink}>
              <LinkIcon className="h-4 w-4 mr-1" />
              {copySuccess ? "Copied!" : "Copy Link"}
            </Button>
            <Button size="sm" variant="outline" onClick={handleTwitterShare}>
              <Twitter className="h-4 w-4 mr-1" />
              Share on Twitter
            </Button>
            <Button size="sm" variant="outline" onClick={handleFacebookShare}>
              <Facebook className="h-4 w-4 mr-1" />
              Share on Facebook
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
