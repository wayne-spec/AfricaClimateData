import DataChart from "@/components/data-chart"
import DataTable from "@/components/data-table"
import DataMap from "@/components/data-map"
import type { VisualizationData } from "@/lib/data"

interface DataVisualizationProps {
  data: VisualizationData
  height?: number
  showControls?: boolean
  timeSeriesData?: {
    [year: string]: any
  }
  insights?: string
  responsive?: boolean
}

export default function DataVisualization({
  data,
  height = 400,
  showControls = true,
  timeSeriesData,
  insights,
  responsive = false,
}: DataVisualizationProps) {
  switch (data.type) {
    case "chart":
      return (
        <DataChart
          chartData={data}
          height={height}
          showControls={showControls}
          timeSeriesData={timeSeriesData}
          insights={insights}
          responsive={responsive}
        />
      )
    case "table":
      return (
        <DataTable
          data={data.data}
          title={data.title}
          description={data.description}
          id={data.id}
          showControls={showControls}
          insights={insights}
          responsive={responsive}
        />
      )
    case "map":
      return (
        <DataMap
          data={data.data}
          title={data.title}
          description={data.description}
          id={data.id}
          showControls={showControls}
          timeSeriesData={timeSeriesData}
          insights={insights}
          responsive={responsive}
        />
      )
    default:
      return <div>Unsupported visualization type</div>
  }
}
