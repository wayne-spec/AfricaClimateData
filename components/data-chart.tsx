"use client"

import { useState, useRef } from "react"
import {
  Line,
  Bar,
  Area,
  Pie,
  Scatter,
  LineChart,
  BarChart,
  AreaChart,
  PieChart,
  ScatterChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Cell,
  Tooltip as RechartsTooltip,
} from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { ChartContainer } from "@/components/ui/chart"
import { Button } from "@/components/ui/button"
import { Download, Maximize2, Info, FileText, Loader2 } from "lucide-react"
import type { VisualizationData } from "@/lib/data"
import { downloadChartAsCSV } from "@/lib/download-utils"
import { exportVisualization } from "@/lib/export-utils"
import VisualizationLogo from "./visualization-logo"
import TimeLapseControl from "./time-lapse-control"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface DataChartProps {
  chartData: VisualizationData
  height?: number
  showControls?: boolean
  timeSeriesData?: {
    [year: string]: VisualizationData
  }
  insights?: string
  responsive?: boolean
}

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

export default function DataChart({
  chartData,
  height = 400,
  showControls = true,
  timeSeriesData,
  insights,
  responsive = false,
}: DataChartProps) {
  const [showInfo, setShowInfo] = useState(false)
  const [showInsights, setShowInsights] = useState(false)
  const [isExporting, setIsExporting] = useState(false)
  const chartRef = useRef<HTMLDivElement>(null)
  const chartId = `chart-${chartData.id}`
  const [currentTimeIndex, setCurrentTimeIndex] = useState(0)

  // Time series data handling
  const hasTimeSeries = timeSeriesData && Object.keys(timeSeriesData).length > 0
  const timePoints = hasTimeSeries ? Object.keys(timeSeriesData || {}) : []
  const currentTimePoint = hasTimeSeries ? timePoints[currentTimeIndex] : null
  const currentData = hasTimeSeries && currentTimePoint ? timeSeriesData![currentTimePoint] : chartData

  // Handle time change
  const handleTimeChange = (index: number) => {
    setCurrentTimeIndex(index)
  }

  // Handle download as CSV
  const handleDownloadCSV = () => {
    try {
      downloadChartAsCSV(currentData)
    } catch (error) {
      console.error("Error downloading CSV:", error)
      alert("Failed to download CSV. Please try again.")
    }
  }

  // Handle export
  const handleExport = async (type: "png" | "svg" | "pdf") => {
    try {
      setIsExporting(true)
      await exportVisualization(chartId, `${currentData.title.replace(/\s+/g, "_")}`, type)
    } catch (error) {
      console.error(`Error exporting as ${type}:`, error)
      alert(`Failed to export as ${type}. Please try again.`)
    } finally {
      setIsExporting(false)
    }
  }

  // Create config object for ChartContainer
  const createConfig = () => {
    const config: Record<string, { label: string; color: string }> = {}

    // Get all data keys except the x-axis key (first key in the data array)
    if (currentData.data.length > 0) {
      const firstDataPoint = currentData.data[0]
      const xAxisKey = Object.keys(firstDataPoint)[0]

      Object.keys(firstDataPoint).forEach((key, index) => {
        if (key !== xAxisKey) {
          config[key] = {
            label: key,
            color: COLORS[index % COLORS.length],
          }
        }
      })
    }

    return config
  }

  // Get x-axis key (first key in the data array)
  const getXAxisKey = () => {
    if (currentData.data.length > 0) {
      return Object.keys(currentData.data[0])[0]
    }
    return ""
  }

  // Get data keys (all keys except the x-axis key)
  const getDataKeys = () => {
    if (currentData.data.length > 0) {
      const firstDataPoint = currentData.data[0]
      const xAxisKey = Object.keys(firstDataPoint)[0]
      return Object.keys(firstDataPoint).filter((key) => key !== xAxisKey)
    }
    return []
  }

  // Custom tooltip formatter
  const customTooltipFormatter = (value: any, name: string, props: any) => {
    return [`${value} (${name})`, "Value"]
  }

  // Render the appropriate chart type
  const renderChart = () => {
    const xAxisKey = getXAxisKey()
    const dataKeys = getDataKeys()

    const chartType = currentData.chartType || "line"

    // Common chart props for responsive design
    const chartProps = {
      margin: { top: 5, right: 5, left: 5, bottom: 5 },
    }

    // Responsive settings for axes
    const xAxisProps = {
      dataKey: xAxisKey,
      tick: { fontSize: responsive ? 10 : 12 },
      tickMargin: 5,
      tickFormatter: (value: any) => {
        // For responsive design, truncate long labels
        if (responsive && typeof value === "string" && value.length > 6) {
          return `${value.substring(0, 6)}...`
        }
        return value
      },
    }

    const yAxisProps = {
      tick: { fontSize: responsive ? 10 : 12 },
      tickMargin: 5,
      width: responsive ? 30 : 60,
    }

    // Responsive legend
    const legendProps = {
      wrapperStyle: { fontSize: responsive ? 10 : 12 },
      iconSize: responsive ? 8 : 10,
      margin: { top: 0, right: 0, left: 0, bottom: 0 },
    }

    switch (chartType) {
      case "line":
        return (
          <LineChart data={currentData.data} {...chartProps}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis {...xAxisProps} />
            <YAxis {...yAxisProps} />
            <RechartsTooltip formatter={customTooltipFormatter} />
            <Legend {...legendProps} />
            {dataKeys.map((key, index) => (
              <Line
                key={key}
                type="monotone"
                dataKey={key}
                stroke={`var(--color-${key})`}
                activeDot={{ r: responsive ? 4 : 8 }}
                strokeWidth={responsive ? 1 : 2}
                dot={{ r: responsive ? 2 : 4 }}
              />
            ))}
          </LineChart>
        )

      case "bar":
        return (
          <BarChart data={currentData.data} {...chartProps}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis {...xAxisProps} />
            <YAxis {...yAxisProps} />
            <RechartsTooltip formatter={customTooltipFormatter} />
            <Legend {...legendProps} />
            {dataKeys.map((key, index) => (
              <Bar
                key={key}
                dataKey={key}
                fill={`var(--color-${key})`}
                radius={[responsive ? 2 : 4, responsive ? 2 : 4, 0, 0]}
                barSize={responsive ? 15 : 20}
              />
            ))}
          </BarChart>
        )

      case "area":
        return (
          <AreaChart data={currentData.data} {...chartProps}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis {...xAxisProps} />
            <YAxis {...yAxisProps} />
            <RechartsTooltip formatter={customTooltipFormatter} />
            <Legend {...legendProps} />
            {dataKeys.map((key, index) => (
              <Area
                key={key}
                type="monotone"
                dataKey={key}
                fill={`var(--color-${key})`}
                stroke={`var(--color-${key})`}
                fillOpacity={0.6}
                strokeWidth={responsive ? 1 : 2}
              />
            ))}
          </AreaChart>
        )

      case "pie":
        // Transform data for pie chart
        const pieData = dataKeys.map((key) => ({
          name: key,
          value: currentData.data[0][key],
        }))

        return (
          <PieChart margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
            <RechartsTooltip formatter={customTooltipFormatter} />
            <Legend {...legendProps} />
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              outerRadius={responsive ? 60 : 80}
              fill="#8884d8"
              dataKey="value"
              label={responsive ? false : true}
              labelLine={responsive ? false : true}
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        )

      case "scatter":
        return (
          <ScatterChart {...chartProps}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis {...xAxisProps} />
            <YAxis {...yAxisProps} />
            <RechartsTooltip formatter={customTooltipFormatter} />
            <Legend {...legendProps} />
            {dataKeys.map((key, index) => (
              <Scatter
                key={key}
                name={key}
                data={currentData.data}
                fill={COLORS[index % COLORS.length]}
                shape={responsive ? "circle" : "diamond"}
                legendType={responsive ? "circle" : "diamond"}
              />
            ))}
          </ScatterChart>
        )

      default:
        return (
          <LineChart data={currentData.data} {...chartProps}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis {...xAxisProps} />
            <YAxis {...yAxisProps} />
            <RechartsTooltip formatter={customTooltipFormatter} />
            <Legend {...legendProps} />
            {dataKeys.map((key, index) => (
              <Line
                key={key}
                type="monotone"
                dataKey={key}
                stroke={COLORS[index % COLORS.length]}
                strokeWidth={responsive ? 1 : 2}
                dot={{ r: responsive ? 2 : 4 }}
              />
            ))}
          </LineChart>
        )
    }
  }

  // Determine card classes based on responsive prop
  const cardClasses = responsive ? "w-full overflow-hidden" : "w-full"

  // Determine header classes based on responsive prop
  const headerClasses = responsive
    ? "flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 p-3"
    : "flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"

  // Determine title classes based on responsive prop
  const titleClasses = responsive ? "text-base sm:text-lg" : "text-xl sm:text-2xl"

  // Determine description classes based on responsive prop
  const descriptionClasses = responsive ? "text-xs sm:text-sm" : "text-sm sm:text-base"

  return (
    <Card className={cardClasses}>
      {showControls && (
        <CardHeader className={headerClasses}>
          <div>
            <CardTitle className={titleClasses}>{currentData.title}</CardTitle>
            <CardDescription className={descriptionClasses}>{currentData.description}</CardDescription>
            {hasTimeSeries && currentTimePoint && (
              <div className="text-xs sm:text-sm font-medium mt-1">Year: {currentTimePoint}</div>
            )}
          </div>
          <div className="flex flex-wrap gap-1 sm:gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="icon" onClick={() => setShowInfo(!showInfo)}>
                    <Info className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>View information about this chart</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="icon" onClick={() => setShowInsights(!showInsights)}>
                    <FileText className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>View insights about this data</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <DropdownMenu>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="icon" disabled={isExporting}>
                        {isExporting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
                      </Button>
                    </DropdownMenuTrigger>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Download or export this visualization</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={handleDownloadCSV}>Download as CSV</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleExport("png")}>Export as PNG</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleExport("svg")}>Export as SVG</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleExport("pdf")}>Export as PDF</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Maximize2 className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>View fullscreen</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </CardHeader>
      )}
      <CardContent className={responsive ? "p-2 sm:p-3" : "p-4 sm:p-6"}>
        {showInfo && (
          <div className="mb-4 p-3 bg-muted rounded-md text-sm">
            <p className="font-medium mb-1">About this chart</p>
            <p>{currentData.description}</p>
            <p className="mt-2 text-xs text-muted-foreground">Source: Africa Climate Data Platform Research</p>
          </div>
        )}
        <div id={chartId} ref={chartRef} className="relative">
          {/* Left logo */}
          <VisualizationLogo size={responsive ? "sm" : "md"} position="left" />

          {/* Right logo - only visible in exports */}
          <VisualizationLogo size={responsive ? "sm" : "md"} position="right" className="hidden" data-logo="right" />

          <ChartContainer
            config={createConfig()}
            className={`h-[${height}px] ${responsive ? "mt-4 pt-1" : "mt-8 pt-2"}`}
          >
            <ResponsiveContainer width="100%" height="100%">
              {renderChart()}
            </ResponsiveContainer>
          </ChartContainer>

          {/* Time-lapse controls */}
          {hasTimeSeries && (
            <div className={responsive ? "mt-2" : "mt-4"}>
              <TimeLapseControl
                timePoints={timePoints}
                currentTimeIndex={currentTimeIndex}
                onTimeChange={handleTimeChange}
                speed={1500}
                compact={responsive}
              />
            </div>
          )}
        </div>

        {/* Insights section */}
        {showInsights && insights && (
          <div className={responsive ? "mt-2" : "mt-4"} className="p-3 bg-blue-50 rounded-md border border-blue-100">
            <h3 className={responsive ? "text-base" : "text-lg"} className="font-semibold mb-2">
              Data Insights
            </h3>
            <div className="prose prose-sm max-w-none">
              <p className={responsive ? "text-xs" : "text-sm"}>{insights}</p>
            </div>
          </div>
        )}
      </CardContent>
      {!responsive && (
        <CardFooter className="text-sm text-gray-500 border-t pt-4 flex-col items-start">
          <Tabs defaultValue="about" className="w-full">
            <TabsList className="mb-2 grid grid-cols-3">
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="methodology">Methodology</TabsTrigger>
              <TabsTrigger value="sources">Sources</TabsTrigger>
            </TabsList>
            <TabsContent value="about" className="text-sm">
              <p>
                This visualization presents {currentData.chartType || "line"} chart data showing trends and patterns in{" "}
                {currentData.title.toLowerCase()}.
              </p>
            </TabsContent>
            <TabsContent value="methodology" className="text-sm">
              <p>
                Data is collected from multiple sources and normalized to ensure comparability. The visualization uses a{" "}
                {currentData.chartType || "line"} chart to represent relationships between variables.
              </p>
            </TabsContent>
            <TabsContent value="sources" className="text-sm">
              <p>
                Data sources: Africa Climate Data Platform Research, World Bank Climate Data, UN Environment Programme.
              </p>
            </TabsContent>
          </Tabs>
        </CardFooter>
      )}
    </Card>
  )
}
