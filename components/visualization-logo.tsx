"use client"

import Image from "next/image"
import { cn } from "@/lib/utils"

interface VisualizationLogoProps {
  size?: "sm" | "md" | "lg"
  position?: "left" | "right"
  className?: string
}

export default function VisualizationLogo({ size = "md", position = "left", className }: VisualizationLogoProps) {
  // Determine logo size based on the size prop
  const dimensions = {
    sm: { width: 80, height: 24 },
    md: { width: 100, height: 30 },
    lg: { width: 120, height: 36 },
  }

  const { width, height } = dimensions[size]

  // Position classes
  const positionClasses = {
    left: "top-2 left-2",
    right: "top-2 right-2",
  }

  return (
    <div className={cn(`absolute ${positionClasses[position]} z-10`, className)}>
      <div className="bg-white/90 p-1 rounded-md shadow-sm">
        <Image
          src="/images/logo.png"
          alt="Africa Climate Data Platform"
          width={width}
          height={height}
          priority
          className="object-contain"
        />
      </div>
    </div>
  )
}
