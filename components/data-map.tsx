"use client"

import { useState, useEffect, useRef, useMemo } from "react"
import dynamic from "next/dynamic"

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, Maximize2, Info, FileText, Layers, Filter } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

import { downloadChartAsCSV } from "@/lib/download-utils"
import { exportVisualization } from "@/lib/export-utils"

import VisualizationLogo from "./visualization-logo"
import TimeLapseControl from "./time-lapse-control"

// Dynamically import Leaflet components to avoid SSR issues
const MapContainer = dynamic(() => import("react-leaflet").then((mod) => mod.MapContainer), { ssr: false })
const TileLayer = dynamic(() => import("react-leaflet").then((mod) => mod.TileLayer), { ssr: false })
const GeoJSON = dynamic(() => import("react-leaflet").then((mod) => mod.GeoJSON), { ssr: false })
const ZoomControl = dynamic(() => import("react-leaflet").then((mod) => mod.ZoomControl), { ssr: false })
const Marker = dynamic(() => import("react-leaflet").then((mod) => mod.Marker), { ssr: false })
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), { ssr: false })
const MarkerClusterGroup = dynamic(() => import("react-leaflet-cluster").then((mod) => mod.default), { ssr: false })
const HeatmapLayer = dynamic(() => import("react-leaflet-heatmap-layer-v3").then((mod) => mod.HeatmapLayer), {
  ssr: false,
})

// Import Leaflet only on the client (for divIcon)
const L: any = typeof window !== "undefined" ? require("leaflet") : null

type VisualizationType = "choropleth" | "points" | "heatmap" | "clusters"

export interface DataMapProps {
  data: Array<{ id: string; name: string; value: number }>
  title: string
  description: string
  id: string
  showControls?: boolean
  timeSeriesData?: {
    [year: string]: Array<{ id: string; name: string; value: number }>
  }
  insights?: string
  geoJsonData?: any
  mapCenter?: [number, number]
  mapZoom?: number
  pointData?: Array<{ id: string; name: string; value: number; lat: number; lng: number }>
}

export default function DataMap({
  data,
  title,
  description,
  id,
  showControls = true,
  timeSeriesData,
  insights,
  geoJsonData,
  mapCenter = [0, 20],
  mapZoom = 3,
  pointData,
}: DataMapProps) {
  const [showInfo, setShowInfo] = useState(false)
  const [showInsights, setShowInsights] = useState(false)
  const [isExporting, setIsExporting] = useState(false)
  const mapRef = useRef<any>(null)
  const [currentTimeIndex, setCurrentTimeIndex] = useState(0)
  const [mapLoaded, setMapLoaded] = useState(false)
  const [visualizationType, setVisualizationType] = useState<VisualizationType>("choropleth")
  const [showLegend, setShowLegend] = useState(true)
  const [pointRadius, setPointRadius] = useState(5)
  const [heatIntensity, setHeatIntensity] = useState(0.5)
  const [mapTileType, setMapTileType] = useState<"standard" | "satellite" | "terrain">("standard")
  const [showLabels, setShowLabels] = useState(true)

  // Time series handling
  const hasTimeSeries = timeSeriesData && Object.keys(timeSeriesData).length > 0
  const timePoints = hasTimeSeries ? Object.keys(timeSeriesData || {}) : []
  const currentTimePoint = hasTimeSeries ? timePoints[currentTimeIndex] : null
  const currentData = hasTimeSeries && currentTimePoint ? timeSeriesData![currentTimePoint] : data

  // Basic stats for color scale
  const values = currentData.map((item) => item.value)
  const minValue = Math.min(...values)
  const maxValue = Math.max(...values)

  const getColor = (value: number) => {
    // Green -> Red gradient
    const ratio = maxValue === minValue ? 0 : (value - minValue) / (maxValue - minValue)
    const r = Math.floor(255 * ratio)
    const g = Math.floor(255 * (1 - ratio))
    const b = 0
    return `rgb(${r}, ${g}, ${b})`
  }

  // Generate fallback point data if not provided
  const generatedPointData = useMemo(() => {
    if (pointData) return pointData
    return currentData.map((country) => {
      const lat = Math.random() * 35 - 15 // -15 to 20
      const lng = Math.random() * 50 - 10 // -10 to 40
      return { id: country.id, name: country.name, value: country.value, lat, lng }
    })
  }, [currentData, pointData])

  const heatmapData = useMemo(() => {
    const denom = maxValue === minValue ? 1 : maxValue - minValue
    return generatedPointData.map((point) => ({
      lat: point.lat,
      lng: point.lng,
      intensity: ((point.value - minValue) / denom) * heatIntensity * 2,
    }))
  }, [generatedPointData, minValue, maxValue, heatIntensity])

  const handleTimeChange = (index: number) => setCurrentTimeIndex(index)

  const handleDownloadCSV = () => {
    downloadChartAsCSV({ id, title, description, data: currentData, type: "map" })
  }

  const handleExport = async (type: "png" | "svg" | "pdf") => {
    try {
      setIsExporting(true)
      await exportVisualization(`${id}-container`, `${title.replace(/\s+/g, "_")}`, type)
    } catch (err) {
      console.error(`Error exporting as ${type}:`, err)
    } finally {
      setIsExporting(false)
    }
  }

  // GeoJSON styling and events
  const styleFeature = (feature: any) => {
    const countryData = currentData.find((d) => d.id === feature.properties.ISO_A3)
    return {
      fillColor: countryData ? getColor(countryData.value) : "#CCCCCC",
      weight: 1,
      opacity: 1,
      color: "white",
      dashArray: "3",
      fillOpacity: visualizationType === "choropleth" ? 0.7 : 0.2,
    }
  }

  const highlightFeature = (e: any) => {
    const layer = e.target
    layer.setStyle({ weight: 2, color: "#666", dashArray: "", fillOpacity: 0.9 })
    if (layer.bringToFront) layer.bringToFront()
  }

  const resetHighlight = (e: any) => {
    const layer = e.target
    layer.setStyle(styleFeature(layer.feature))
  }

  const onEachFeature = (feature: any, layer: any) => {
    const countryData = currentData.find((d) => d.id === feature.properties.ISO_A3)
    if (countryData) {
      layer.bindPopup(`
        <strong>${feature.properties.NAME}</strong><br/>
        Value: ${countryData.value}
      `)
    } else {
      layer.bindPopup(`<strong>${feature.properties.NAME}</strong><br/>No data available`)
    }
    layer.on({ mouseover: highlightFeature, mouseout: resetHighlight })
  }

  // Marker icon using a divIcon (no external PNGs)
  const getMarkerIcon = (value: number) => {
    if (!L) return null
    const size = pointRadius * 2
    return L.divIcon({
      html: `<div style="
        background-color: ${getColor(value)};
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        border: 1px solid white;
        opacity: 0.85;
      "></div>`,
      className: "custom-div-icon",
      iconSize: [size, size],
      iconAnchor: [pointRadius, pointRadius],
    })
  }

  // Load Leaflet CSS on client side
  useEffect(() => {
    if (typeof window !== "undefined") {
      import("leaflet/dist/leaflet.css")
      import("react-leaflet-cluster/lib/assets/MarkerCluster.css")
      import("react-leaflet-cluster/lib/assets/MarkerCluster.Default.css")
      setMapLoaded(true)
    }
  }, [])

  const getTileLayerUrl = () => {
    switch (mapTileType) {
      case "satellite":
        return "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
      case "terrain":
        return "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
      default:
        return "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    }
  }

  const getTileLayerAttribution = () => {
    switch (mapTileType) {
      case "satellite":
        return "&copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
      case "terrain":
        return '&copy; <a href="https://opentopomap.org">OpenTopoMap</a> contributors'
      default:
        return '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }
  }

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
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
                  <Button variant="outline" size="icon" onClick={() => setShowInfo((v) => !v)} aria-label="Info">
                    <Info className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>View information about this map</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setShowInsights((v) => !v)}
                    aria-label="Insights"
                  >
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
                      <Button variant="outline" size="icon" disabled={isExporting} aria-label="Export">
                        <Download className="h-4 w-4" />
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
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" size="icon" aria-label="Map settings">
                        <Layers className="h-4 w-4" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80">
                      <div className="space-y-4">
                        <h4 className="font-medium">Map Settings</h4>

                        <div className="space-y-2">
                          <Label>Visualization Type</Label>
                          <Select
                            value={visualizationType}
                            onValueChange={(value) => setVisualizationType(value as VisualizationType)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select visualization type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="choropleth">Choropleth</SelectItem>
                              <SelectItem value="points">Points</SelectItem>
                              <SelectItem value="heatmap">Heatmap</SelectItem>
                              <SelectItem value="clusters">Clusters</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label>Map Style</Label>
                          <Select value={mapTileType} onValueChange={(value) => setMapTileType(value as any)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select map style" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="standard">Standard</SelectItem>
                              <SelectItem value="satellite">Satellite</SelectItem>
                              <SelectItem value="terrain">Terrain</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        {visualizationType === "points" && (
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <Label>Point Size</Label>
                              <span className="text-xs text-muted-foreground">{pointRadius}</span>
                            </div>
                            <Slider
                              value={[pointRadius]}
                              min={2}
                              max={15}
                              step={1}
                              onValueChange={(value) => setPointRadius(value[0])}
                            />
                          </div>
                        )}

                        {visualizationType === "heatmap" && (
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <Label>Heat Intensity</Label>
                              <span className="text-xs text-muted-foreground">{heatIntensity.toFixed(1)}</span>
                            </div>
                            <Slider
                              value={[heatIntensity]}
                              min={0.1}
                              max={1.0}
                              step={0.1}
                              onValueChange={(value) => setHeatIntensity(value[0])}
                            />
                          </div>
                        )}

                        <div className="flex items-center space-x-2">
                          <Switch id="show-legend" checked={showLegend} onCheckedChange={setShowLegend} />
                          <Label htmlFor="show-legend">Show Legend</Label>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Switch id="show-labels" checked={showLabels} onCheckedChange={setShowLabels} />
                          <Label htmlFor="show-labels">Show Labels</Label>
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Map settings</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" size="icon" aria-label="Filter data">
                        <Filter className="h-4 w-4" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80">
                      <div className="space-y-4">
                        <h4 className="font-medium">Filter Data</h4>
                        <div className="space-y-2">
                          <Label>Value Range</Label>
                          <div className="flex items-center space-x-2">
                            <span className="text-xs">{minValue}</span>
                            <Slider
                              defaultValue={[minValue, maxValue]}
                              min={minValue}
                              max={maxValue}
                              step={Math.max(1, (maxValue - minValue) / 100)}
                              className="flex-1"
                            />
                            <span className="text-xs">{maxValue}</span>
                          </div>
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Filter data</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="icon" aria-label="Fullscreen">
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
            <p className="font-medium mb-1">About this map</p>
            <p>{description}</p>
            <p className="mt-2 text-xs text-muted-foreground">Source: Africa Climate Data Platform Research</p>
          </div>
        )}

        <div id={`${id}-container`} ref={mapRef} className="relative">
          <VisualizationLogo size="sm" />

          <div className="h-[400px] md:h-[500px] rounded-md overflow-hidden">
            {mapLoaded && (
              <MapContainer
                center={mapCenter}
                zoom={mapZoom}
                style={{ height: "100%", width: "100%" }}
                zoomControl={false}
              >
                <TileLayer attribution={getTileLayerAttribution()} url={getTileLayerUrl()} />

                {/* Choropleth Layer */}
                {geoJsonData && (visualizationType === "choropleth" || showLabels) && (
                  <GeoJSON data={geoJsonData} style={styleFeature} onEachFeature={onEachFeature} />
                )}

                {/* Points Layer */}
                {visualizationType === "points" &&
                  generatedPointData?.map((point) => (
                    <Marker key={point.id} position={[point.lat, point.lng]} icon={getMarkerIcon(point.value)}>
                      <Popup>
                        <strong>{point.name}</strong>
                        <br />
                        Value: {point.value}
                      </Popup>
                    </Marker>
                  ))}

                {/* Heatmap Layer */}
                {visualizationType === "heatmap" && heatmapData && (
                  <HeatmapLayer
                    points={heatmapData}
                    longitudeExtractor={(m: any) => m.lng}
                    latitudeExtractor={(m: any) => m.lat}
                    intensityExtractor={(m: any) => m.intensity}
                    radius={20}
                    max={1.0}
                    minOpacity={0.1}
                    blur={15}
                  />
                )}

                {/* Clustered Points Layer */}
                {visualizationType === "clusters" && generatedPointData && (
                  <MarkerClusterGroup>
                    {generatedPointData.map((point) => (
                      <Marker key={point.id} position={[point.lat, point.lng]} icon={getMarkerIcon(point.value)}>
                        <Popup>
                          <strong>{point.name}</strong>
                          <br />
                          Value: {point.value}
                        </Popup>
                      </Marker>
                    ))}
                  </MarkerClusterGroup>
                )}

                <ZoomControl position="bottomright" />
              </MapContainer>
            )}
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

          {/* Legend */}
          {showLegend && (
            <div className="absolute bottom-4 right-4 bg-white p-2 rounded-md shadow-md z-[1000]">
              <div className="text-xs font-medium mb-1">Legend</div>
              <div className="flex items-center">
                <div className="w-20 h-4 bg-gradient-to-r from-green-500 to-red-500 rounded"></div>
                <span className="ml-2 text-xs">{minValue}</span>
                <span className="mx-1 text-xs">-</span>
                <span className="text-xs">{maxValue}</span>
              </div>
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

      <CardFooter className="text-sm text-gray-500 border-t pt-4 flex-col items-start">
        <Tabs defaultValue="about" className="w-full">
          <TabsList className="mb-2 grid grid-cols-3">
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="methodology">Methodology</TabsTrigger>
            <TabsTrigger value="sources">Sources</TabsTrigger>
          </TabsList>
          <TabsContent value="about" className="text-sm">
            <p>
              This map visualization shows geographical data across different regions. The color intensity represents
              the value magnitude. You can switch between different visualization types using the settings menu.
            </p>
          </TabsContent>
          <TabsContent value="methodology" className="text-sm">
            <p>
              Data is collected from multiple sources and normalized to ensure comparability. The visualization uses a
              color gradient to represent value intensity. Points are positioned based on country centroids or specific
              coordinates.
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
