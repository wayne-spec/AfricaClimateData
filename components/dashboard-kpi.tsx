import type React from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowDown, ArrowUp, ArrowRight, HelpCircle } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface DashboardKPIProps {
  title: string
  value: string | number
  description?: string
  change?: {
    value: number
    type: "increase" | "decrease" | "neutral"
    timeframe: string
  }
  helpText?: string
  footer?: React.ReactNode
  className?: string
  size?: "sm" | "md" | "lg"
}

export default function DashboardKPI({
  title,
  value,
  description,
  change,
  helpText,
  footer,
  className = "",
  size = "md",
}: DashboardKPIProps) {
  const getChangeColor = (type: "increase" | "decrease" | "neutral") => {
    switch (type) {
      case "increase":
        return "text-green-600 bg-green-50"
      case "decrease":
        return "text-red-600 bg-red-50"
      case "neutral":
        return "text-gray-600 bg-gray-50"
    }
  }

  const getChangeIcon = (type: "increase" | "decrease" | "neutral") => {
    switch (type) {
      case "increase":
        return <ArrowUp className="h-3 w-3" />
      case "decrease":
        return <ArrowDown className="h-3 w-3" />
      case "neutral":
        return <ArrowRight className="h-3 w-3" />
    }
  }

  const getSizeClasses = (size: "sm" | "md" | "lg") => {
    switch (size) {
      case "sm":
        return {
          card: "h-32",
          title: "text-xs",
          value: "text-xl",
          description: "text-xs",
        }
      case "md":
        return {
          card: "h-40",
          title: "text-sm",
          value: "text-2xl",
          description: "text-xs",
        }
      case "lg":
        return {
          card: "h-48",
          title: "text-base",
          value: "text-3xl",
          description: "text-sm",
        }
    }
  }

  const sizeClasses = getSizeClasses(size)

  return (
    <Card className={`${sizeClasses.card} ${className}`}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className={`${sizeClasses.title} text-gray-600`}>{title}</CardTitle>
          {helpText && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <HelpCircle className="h-4 w-4 text-gray-400" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs text-xs">{helpText}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-end gap-2">
          <div className={`${sizeClasses.value} font-bold`}>{value}</div>
          {change && (
            <div
              className={`${getChangeColor(change.type)} text-xs px-2 py-1 rounded-full flex items-center gap-1 mb-1`}
            >
              {getChangeIcon(change.type)}
              <span>{Math.abs(change.value)}%</span>
            </div>
          )}
        </div>
        {description && <CardDescription className={`${sizeClasses.description} mt-1`}>{description}</CardDescription>}
        {change && (
          <div className="text-xs text-gray-500 mt-1">
            {change.type === "increase" ? "Up" : change.type === "decrease" ? "Down" : "No change"} from{" "}
            {change.timeframe}
          </div>
        )}
      </CardContent>
      {footer && <CardFooter className="pt-0 pb-2">{footer}</CardFooter>}
    </Card>
  )
}
