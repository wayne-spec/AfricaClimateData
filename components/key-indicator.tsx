"use client"

import Link from "next/link"
import { ChevronDown, ChevronUp, BarChart, Map, Table } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import DataVisualization from "@/components/data-visualization"
import type { VisualizationData } from "@/lib/data"

interface KeyIndicatorProps {
  title: string
  source: string
  description: string
  narrativeTitle: string
  narrativeText: string
  visualization: VisualizationData
  defaultOpen?: boolean
  onToggle: () => void
}

export default function KeyIndicator({
  title,
  source,
  description,
  narrativeTitle,
  narrativeText,
  visualization,
  defaultOpen = false,
  onToggle,
}: KeyIndicatorProps) {
  const getIcon = () => {
    switch (visualization.type) {
      case "chart":
        return <BarChart className="h-5 w-5 mr-2 flex-shrink-0" />
      case "map":
        return <Map className="h-5 w-5 mr-2 flex-shrink-0" />
      case "table":
        return <Table className="h-5 w-5 mr-2 flex-shrink-0" />
      default:
        return <BarChart className="h-5 w-5 mr-2 flex-shrink-0" />
    }
  }

  return (
    <div className="mb-4 w-full">
      <button
        onClick={() => onToggle()}
        className="w-full flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
        aria-expanded={defaultOpen}
      >
        <div className="flex items-center overflow-hidden">
          {getIcon()}
          <div className="overflow-hidden">
            <h3 className="font-medium text-left truncate">{title}</h3>
            <p className="text-sm text-gray-500 text-left truncate">{source}</p>
          </div>
        </div>
        <div className="flex-shrink-0 ml-2">
          {defaultOpen ? (
            <ChevronUp className="h-5 w-5 text-gray-500" />
          ) : (
            <ChevronDown className="h-5 w-5 text-gray-500" />
          )}
        </div>
      </button>

      {defaultOpen && (
        <Card className="mt-2 overflow-hidden">
          <CardContent className="p-0">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
              <div className="md:col-span-4 p-4 md:p-6 bg-gray-50">
                <div className="mb-4">
                  <h4 className="font-medium">{title}</h4>
                  <p className="text-sm text-gray-500">{source}</p>
                </div>
                <h4 className="text-xl font-bold mb-4">{narrativeTitle}</h4>
                <div className="prose prose-sm mb-6 max-w-full">
                  <p>{narrativeText}</p>
                </div>
                <Link href={`/visualizations/${visualization.id}`}>
                  <Button className="w-full">Explore and learn more about this data</Button>
                </Link>
              </div>
              <div className="md:col-span-8 p-4 md:p-6 overflow-hidden">
                <div className="w-full h-[300px] md:h-[400px] overflow-hidden">
                  <DataVisualization data={visualization} height={300} showControls={false} responsive={true} />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
