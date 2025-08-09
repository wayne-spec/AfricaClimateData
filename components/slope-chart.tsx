"use client"

import { useState, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, Maximize2, Info } from "lucide-react"
import { downloadChartAsCSV, downloadChartAsImage } from "@/lib/download-utils"
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Legend } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface SlopeChartProps {
  data: any[]
  title: string
  description: string
  id: string
  showControls?: boolean
  height?: number
}

export default function SlopeChart({
  data,
  title,
  description,
  id,
  showControls = true,
  height = 400,
}: SlopeChartProps) {
  const [showInfo, setShowInfo] = useState(false)
  const chartRef = useRef<HTMLDivElement>(null)
  const chartId = `slope-${id}`

  // Handle download as CSV
  const handleDownloadCSV = () => {
    downloadChartAsCSV({ id, title, description, data, type: "chart" })
  }

  // Handle download as image
  const handleDownloadImage = () => {
    downloadChartAsImage(chartId, { id, title, description, data, type: "chart" })
  }

  // Process data for slope chart
  // A slope chart typically shows change between two time points
  const processDataForSlopeChart = () => {
    if (!data || data.length === 0) return []

    // Get the first and last data points if we have time series data
    // Or use the first two points if we only have two points
    let startPoint, endPoint

    if (data.length >= 2) {
      startPoint = data[0]
      endPoint = data[data.length - 1]
    } else {
      return data // Not enough data for a slope chart
    }

    // Get all keys except the x-axis key (first key)
    const xAxisKey = Object.keys(startPoint)[0]
    const dataKeys = Object.keys(startPoint).filter((key) => key !== xAxisKey)

    // Create slope chart data
    return [
      { ...startPoint, period: "Start" },
      { ...endPoint, period: "End" },
    ]
  }

  const slopeData = processDataForSlopeChart()

  // Get data keys (all keys except the x-axis key and 'period')
  const getDataKeys = () => {
    if (slopeData.length > 0) {
      return Object.keys(slopeData[0]).filter((key) => key !== "period" && key !== Object.keys(data[0])[0])
    }
    return []
  }

  // Create config object for ChartContainer
  const createConfig = () => {
    const config: Record<string, { label: string; color: string }> = {}
    const COLORS = [
      "#1B8A3F", // africa-green
      "#E42D40", // africa-red
      "#222222", // africa-black
      "#8FD14F", // africa-light-green
      "#0A5D22", // africa-dark-green
      "#F87171", // light red
      "#60A5FA", // blue
      "#C084FC", // purple
    ]

    getDataKeys().forEach((key, index) => {
      config[key] = {
        label: key,
        color: COLORS[index % COLORS.length],
      }
    })

    return config
  }

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>{title} - Change Over Time</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
        {showControls && (
          <div className="flex space-x-2">
            <Button variant="outline" size="icon" onClick={() => setShowInfo(!showInfo)}>
              <Info className="h-4 w-4" />
            </Button>
            <div className="relative group">
              <Button variant="outline" size="icon">
                <Download className="h-4 w-4" />
              </Button>
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 hidden group-hover:block">
                <div className="py-1">
                  <button
                    onClick={handleDownloadCSV}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Download as CSV
                  </button>
                  <button
                    onClick={handleDownloadImage}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Download as Image
                  </button>
                </div>
              </div>
            </div>
            <Button variant="outline" size="icon">
              <Maximize2 className="h-4 w-4" />
            </Button>
          </div>
        )}
      </CardHeader>
      <CardContent>
        {showInfo && (
          <div className="mb-4 p-3 bg-muted rounded-md text-sm">
            <p className="font-medium mb-1">About this slope chart</p>
            <p>{description}</p>
            <p className="mt-2 text-xs text-muted-foreground">
              This slope chart shows the change from {data[0][Object.keys(data[0])[0]]} to{" "}
              {data[data.length - 1][Object.keys(data[0])[0]]}.
            </p>
          </div>
        )}
        <div id={chartId} ref={chartRef}>
          <ChartContainer config={createConfig()} className={`h-[${height}px]`}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={slopeData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="period" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend />
                {getDataKeys().map((key) => (
                  <Line
                    key={key}
                    type="monotone"
                    dataKey={key}
                    stroke={`var(--color-${key})`}
                    strokeWidth={2}
                    activeDot={{ r: 8 }}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  )
}
