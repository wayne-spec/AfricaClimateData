"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Share2, Download, LinkIcon } from "lucide-react"
import DataChart from "@/components/data-chart"
import DataTable from "@/components/data-table"
import DataMap from "@/components/data-map"
import SlopeChart from "@/components/slope-chart"
import { downloadChartAsCSV } from "@/lib/download-utils"
import type { VisualizationData } from "@/lib/data"
import {
  loadAfricaGeoJSON,
  prepareDataForMap,
  getMapSettings,
  generatePointData,
  generateTimeSeriesPointData,
} from "@/lib/geo-utils"

interface MultiVisualizationProps {
  data: VisualizationData
  height?: number
}

export default function MultiVisualization({ data, height = 400 }: MultiVisualizationProps) {
  const [shareTooltip, setShareTooltip] = useState(false)
  const [copySuccess, setCopySuccess] = useState(false)
  const [geoJsonData, setGeoJsonData] = useState(null)
  const [pointData, setPointData] = useState(null)
  const [timeSeriesPointData, setTimeSeriesPointData] = useState(null)

  // Load GeoJSON data when component mounts
  useEffect(() => {
    async function loadGeoData() {
      const geoData = await loadAfricaGeoJSON()
      setGeoJsonData(geoData)

      // Generate point data if we have GeoJSON
      if (geoData) {
        const mapData = data.type === "map" ? data.data : prepareDataForMap(data)
        const points = generatePointData(mapData, geoData)
        setPointData(points)

        // Generate time series point data if available
        if (data.type === "map" && data.timeSeriesData) {
          const timeSeriesPoints = generateTimeSeriesPointData(data.timeSeriesData, geoData)
          setTimeSeriesPointData(timeSeriesPoints)
        }
      }
    }

    loadGeoData()
  }, [data])

  // Handle share functionality
  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: data.title,
          text: data.description,
          url: window.location.href,
        })
        .catch((error) => console.log("Error sharing", error))
    } else {
      setShareTooltip(true)
      setTimeout(() => setShareTooltip(false), 3000)
    }
  }

  // Handle copy link
  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href)
    setCopySuccess(true)
    setTimeout(() => setCopySuccess(false), 2000)
  }

  // Handle download all data
  const handleDownloadData = () => {
    downloadChartAsCSV(data)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">{data.title}</h1>
          <p className="text-gray-600">{data.description}</p>
        </div>
        <div className="flex space-x-2">
          <div className="relative">
            <Button variant="outline" onClick={handleShare}>
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
            {shareTooltip && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg z-10 p-4">
                <p className="text-sm mb-2">Share this visualization:</p>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline" onClick={handleCopyLink}>
                    <LinkIcon className="h-4 w-4 mr-1" />
                    {copySuccess ? "Copied!" : "Copy Link"}
                  </Button>
                </div>
              </div>
            )}
          </div>
          <Button variant="outline" onClick={handleDownloadData}>
            <Download className="h-4 w-4 mr-2" />
            Download Data
          </Button>
        </div>
      </div>

      <Tabs defaultValue="chart" className="w-full">
        <TabsList className="grid grid-cols-4 mb-6">
          <TabsTrigger value="chart">Line Chart</TabsTrigger>
          <TabsTrigger value="slope">Slope Chart</TabsTrigger>
          <TabsTrigger value="map">Map</TabsTrigger>
          <TabsTrigger value="table">Table</TabsTrigger>
        </TabsList>

        <TabsContent value="chart">
          <DataChart chartData={data} height={height} />
        </TabsContent>

        <TabsContent value="slope">
          <SlopeChart data={data.data} title={data.title} description={data.description} id={data.id} height={height} />
        </TabsContent>

        <TabsContent value="map">
          <Card>
            <CardHeader>
              <CardTitle>{data.title} - Geographic Distribution</CardTitle>
              <CardDescription>{data.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <DataMap
                data={data.type === "map" ? data.data : prepareDataForMap(data)}
                title={data.title}
                description={data.description}
                id={data.id}
                geoJsonData={geoJsonData}
                mapCenter={getMapSettings().center}
                mapZoom={getMapSettings().zoom}
                pointData={pointData}
                timeSeriesData={data.type === "map" ? data.timeSeriesData : null}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="table">
          <DataTable data={data.data} title={data.title} description={data.description} id={data.id} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

// Helper function to transform data for map visualization if needed
function transformDataForMap(data: VisualizationData): any[] {
  // If data is already in map format, return it
  if (data.type === "map") {
    return data.data
  }

  // For non-map data, we need to transform it
  // This is a simplified example - in a real app, you'd have more sophisticated logic

  // Sample country codes for demonstration
  const countryCodes: Record<string, string> = {
    Algeria: "DZA",
    Angola: "AGO",
    Benin: "BEN",
    Botswana: "BWA",
    "Burkina Faso": "BFA",
    Burundi: "BDI",
    Cameroon: "CMR",
    "Cape Verde": "CPV",
    "Central African Republic": "CAF",
    Chad: "TCD",
    Comoros: "COM",
    "DR Congo": "COD",
    "Democratic Republic of the Congo": "COD",
    Djibouti: "DJI",
    Egypt: "EGY",
    "Equatorial Guinea": "GNQ",
    Eritrea: "ERI",
    Ethiopia: "ETH",
    Gabon: "GAB",
    Gambia: "GMB",
    Ghana: "GHA",
    Guinea: "GIN",
    "Guinea-Bissau": "GNB",
    "Ivory Coast": "CIV",
    Kenya: "KEN",
    Lesotho: "LSO",
    Liberia: "LBR",
    Libya: "LBY",
    Madagascar: "MDG",
    Malawi: "MWI",
    Mali: "MLI",
    Mauritania: "MRT",
    Morocco: "MAR",
    Mozambique: "MOZ",
    Namibia: "NAM",
    Niger: "NER",
    Nigeria: "NGA",
    Rwanda: "RWA",
    Senegal: "SEN",
    "Sierra Leone": "SLE",
    Somalia: "SOM",
    "South Africa": "ZAF",
    "South Sudan": "SSD",
    Sudan: "SDN",
    Tanzania: "TZA",
    Togo: "TGO",
    Tunisia: "TUN",
    Uganda: "UGA",
    Zambia: "ZMB",
    Zimbabwe: "ZWE",
  }

  // Check if data has a country column
  const hasCountryColumn = data.data.some((item) =>
    Object.keys(item).some((key) => key.toLowerCase() === "country" || countryCodes[key] !== undefined),
  )

  if (hasCountryColumn) {
    // Find the latest time point if data has time series
    const latestData = data.data[data.data.length - 1]

    // Extract country data
    return Object.entries(latestData)
      .filter(([key]) => key.toLowerCase() !== "year" && key.toLowerCase() !== "date")
      .map(([key, value]) => {
        // If key is a country name
        if (countryCodes[key]) {
          return {
            id: countryCodes[key],
            name: key,
            value: Number(value),
          }
        }
        // If we have a country column and value columns
        else if (key.toLowerCase() === "country") {
          const countryName = String(value)
          const countryCode = countryCodes[countryName] || "UNK"
          // Find a numeric value in the same row
          const numericValue = Object.entries(latestData).find(([k, v]) => k !== key && typeof v === "number")

          return {
            id: countryCode,
            name: countryName,
            value: numericValue ? Number(numericValue[1]) : 0,
          }
        }
        return null
      })
      .filter((item) => item !== null)
  }

  // Fallback: return sample data
  return [
    { id: "DZA", name: "Algeria", value: 1.5 },
    { id: "EGY", name: "Egypt", value: 1.7 },
    { id: "MAR", name: "Morocco", value: 1.6 },
    { id: "TUN", name: "Tunisia", value: 1.6 },
    { id: "ZAF", name: "South Africa", value: 1.4 },
    { id: "KEN", name: "Kenya", value: 1.3 },
    { id: "NGA", name: "Nigeria", value: 1.3 },
    { id: "ETH", name: "Ethiopia", value: 1.4 },
  ]
}
