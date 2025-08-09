"use client"

import { useState, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Download, Maximize2, Info, FileText } from "lucide-react"
import { downloadChartAsCSV } from "@/lib/download-utils"
import { exportVisualization } from "@/lib/export-utils"
import VisualizationLogo from "./visualization-logo"
import TimeLapseControl from "./time-lapse-control"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface DataTableProps {
  data: any[]
  title: string
  description: string
  id: string
  showControls?: boolean
  timeSeriesData?: {
    [year: string]: any[]
  }
  insights?: string
}

export default function DataTable({
  data,
  title,
  description,
  id,
  showControls = true,
  timeSeriesData,
  insights,
}: DataTableProps) {
  const [showInfo, setShowInfo] = useState(false)
  const [showInsights, setShowInsights] = useState(false)
  const tableRef = useRef<HTMLDivElement>(null)
  const [currentTimeIndex, setCurrentTimeIndex] = useState(0)

  // Time series data handling
  const hasTimeSeries = timeSeriesData && Object.keys(timeSeriesData).length > 0
  const timePoints = hasTimeSeries ? Object.keys(timeSeriesData || {}) : []
  const currentTimePoint = hasTimeSeries ? timePoints[currentTimeIndex] : null
  const currentData = hasTimeSeries && currentTimePoint ? timeSeriesData![currentTimePoint] : data

  // Handle time change
  const handleTimeChange = (index: number) => {
    setCurrentTimeIndex(index)
  }

  // Get column headers from the first data item
  const getHeaders = () => {
    if (currentData && currentData.length > 0) {
      return Object.keys(currentData[0])
    }
    return []
  }

  // Handle download as CSV
  const handleDownloadCSV = () => {
    downloadChartAsCSV({ id, title, description, data: currentData, type: "table" })
  }

  // Handle export
  const handleExport = async (type: "png" | "svg" | "pdf") => {
    try {
      await exportVisualization(`${id}-container`, `${title.replace(/\s+/g, "_")}`, type)
    } catch (error) {
      console.error(`Error exporting as ${type}:`, error)
    }
  }

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
          {hasTimeSeries && currentTimePoint && (
            <div className="text-sm font-medium mt-1">Year: {currentTimePoint}</div>
          )}
        </div>
        {showControls && (
          <div className="flex space-x-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="icon" onClick={() => setShowInfo(!showInfo)}>
                    <Info className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>View information about this table</p>
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
                      <Button variant="outline" size="icon">
                        <Download className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Download or export this table</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={handleDownloadCSV}>Download as CSV</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleExport("png")}>Export as PNG</DropdownMenuItem>
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
        )}
      </CardHeader>
      <CardContent>
        {showInfo && (
          <div className="mb-4 p-3 bg-muted rounded-md text-sm">
            <p className="font-medium mb-1">About this table</p>
            <p>{description}</p>
            <p className="mt-2 text-xs text-muted-foreground">Source: Africa Climate Data Platform Research</p>
          </div>
        )}

        <div id={`${id}-container`} ref={tableRef} className="relative">
          <VisualizationLogo size="sm" />

          <div className="rounded-md border">
            <Table>
              <TableCaption>Table: {title}</TableCaption>
              <TableHeader>
                <TableRow>
                  {getHeaders().map((header) => (
                    <TableHead key={header} className="font-medium">
                      {header}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentData.map((row, rowIndex) => (
                  <TableRow key={rowIndex}>
                    {getHeaders().map((header) => (
                      <TableCell key={`${rowIndex}-${header}`}>{row[header]}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Time-lapse controls */}
          {hasTimeSeries && (
            <div className="mt-4">
              <TimeLapseControl
                timePoints={timePoints}
                currentTimeIndex={currentTimeIndex}
                onTimeChange={handleTimeChange}
                speed={1500}
              />
            </div>
          )}
        </div>

        {/* Insights section */}
        {showInsights && insights && (
          <div className="mt-4 p-4 bg-blue-50 rounded-md border border-blue-100">
            <h3 className="text-lg font-semibold mb-2">Data Insights</h3>
            <div className="prose prose-sm max-w-none">
              <p>{insights}</p>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="text-sm text-gray-500 border-t pt-4">
        <Tabs defaultValue="about" className="w-full">
          <TabsList className="mb-2">
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="methodology">Methodology</TabsTrigger>
            <TabsTrigger value="sources">Sources</TabsTrigger>
          </TabsList>
          <TabsContent value="about" className="text-sm">
            <p>
              This table presents data on {title.toLowerCase()}. Each row represents a different entry, with columns
              showing various attributes.
            </p>
          </TabsContent>
          <TabsContent value="methodology" className="text-sm">
            <p>
              Data is collected from multiple sources and normalized to ensure comparability. The table presents raw
              data for detailed analysis.
            </p>
          </TabsContent>
          <TabsContent value="sources" className="text-sm">
            <p>
              Data sources: Africa Climate Data Platform Research, World Bank Climate Data, UN Environment Programme.
            </p>
          </TabsContent>
        </Tabs>
      </CardFooter>
    </Card>
  )
}
