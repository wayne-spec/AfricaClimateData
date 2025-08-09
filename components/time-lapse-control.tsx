"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Play, Pause, SkipBack, SkipForward } from "lucide-react"

interface TimeLapseControlProps {
  timePoints: string[]
  currentTimeIndex: number
  onTimeChange: (index: number) => void
  speed?: number
  compact?: boolean
}

export default function TimeLapseControl({
  timePoints,
  currentTimeIndex,
  onTimeChange,
  speed = 1000,
  compact = false,
}: TimeLapseControlProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  // Clean up interval on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [])

  // Handle play/pause
  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        onTimeChange((currentTimeIndex + 1) % timePoints.length)
      }, speed)
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isPlaying, currentTimeIndex, timePoints.length, onTimeChange, speed])

  // Toggle play/pause
  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  // Step backward
  const stepBackward = () => {
    if (isPlaying && intervalRef.current) {
      clearInterval(intervalRef.current)
      setIsPlaying(false)
    }
    onTimeChange(currentTimeIndex === 0 ? timePoints.length - 1 : currentTimeIndex - 1)
  }

  // Step forward
  const stepForward = () => {
    if (isPlaying && intervalRef.current) {
      clearInterval(intervalRef.current)
      setIsPlaying(false)
    }
    onTimeChange((currentTimeIndex + 1) % timePoints.length)
  }

  // Handle slider change
  const handleSliderChange = (value: number[]) => {
    if (isPlaying && intervalRef.current) {
      clearInterval(intervalRef.current)
      setIsPlaying(false)
    }
    onTimeChange(value[0])
  }

  return (
    <div className="flex flex-col space-y-2">
      <div className="flex items-center justify-between">
        <div className={compact ? "text-xs" : "text-sm font-medium"}>{compact ? "" : "Time-lapse Controls"}</div>
        <div className={compact ? "text-xs" : "text-sm"}>{timePoints[currentTimeIndex]}</div>
      </div>
      <div className="flex items-center space-x-1 sm:space-x-2">
        <Button
          variant="outline"
          size={compact ? "sm" : "icon"}
          onClick={stepBackward}
          className={compact ? "h-7 w-7 p-0" : ""}
        >
          <SkipBack className={compact ? "h-3 w-3" : "h-4 w-4"} />
        </Button>
        <Button
          variant="outline"
          size={compact ? "sm" : "icon"}
          onClick={togglePlayPause}
          className={compact ? "h-7 w-7 p-0" : ""}
        >
          {isPlaying ? (
            <Pause className={compact ? "h-3 w-3" : "h-4 w-4"} />
          ) : (
            <Play className={compact ? "h-3 w-3" : "h-4 w-4"} />
          )}
        </Button>
        <Button
          variant="outline"
          size={compact ? "sm" : "icon"}
          onClick={stepForward}
          className={compact ? "h-7 w-7 p-0" : ""}
        >
          <SkipForward className={compact ? "h-3 w-3" : "h-4 w-4"} />
        </Button>
        <div className="flex-1">
          <Slider
            value={[currentTimeIndex]}
            max={timePoints.length - 1}
            step={1}
            onValueChange={handleSliderChange}
            className={compact ? "h-1" : ""}
          />
        </div>
      </div>
    </div>
  )
}
