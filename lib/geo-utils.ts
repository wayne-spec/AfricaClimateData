// GeoJSON data utilities

import type { VisualizationData } from "./data"

// Function to load GeoJSON data for Africa
export async function loadAfricaGeoJSON() {
  try {
    // In a real implementation, you would load this from a file or API
    // For now, we'll use a placeholder URL to a GeoJSON file
    const response = await fetch("/data/africa.geojson")
    if (!response.ok) {
      throw new Error("Failed to load GeoJSON data")
    }
    return await response.json()
  } catch (error) {
    console.error("Error loading GeoJSON:", error)
    return null
  }
}

// Function to transform visualization data to be compatible with GeoJSON
export function prepareDataForMap(visualization: VisualizationData) {
  // If the data is already in the right format, return it
  if (visualization.type === "map") {
    return visualization.data
  }

  // Otherwise, transform it to be compatible with map visualization
  // This is a simplified example - in a real app, you'd have more sophisticated logic
  return visualization.data.map((item) => {
    // Extract country code and value
    const countryCode = Object.keys(item).find((key) => key !== "year" && key !== "date")
    const value = countryCode ? item[countryCode] : 0

    return {
      id: countryCode,
      name: countryCode, // In a real app, you'd map this to a proper country name
      value: value,
    }
  })
}

// Function to get map center and zoom based on region
export function getMapSettings(region?: string) {
  switch (region?.toLowerCase()) {
    case "north africa":
      return { center: [28, 15] as [number, number], zoom: 4 }
    case "west africa":
      return { center: [10, 0] as [number, number], zoom: 4 }
    case "east africa":
      return { center: [5, 35] as [number, number], zoom: 4 }
    case "central africa":
      return { center: [0, 20] as [number, number], zoom: 4 }
    case "southern africa":
      return { center: [-20, 25] as [number, number], zoom: 4 }
    default:
      return { center: [0, 20] as [number, number], zoom: 3 } // Default to full Africa view
  }
}

// Generate point data from country data
export function generatePointData(countryData: any[], geoJsonData: any) {
  if (!geoJsonData || !geoJsonData.features) return []

  return countryData.map((country) => {
    // Find the corresponding feature in GeoJSON
    const feature = geoJsonData.features.find((f: any) => f.properties.ISO_A3 === country.id)

    // If we found a feature, use its centroid
    if (feature && feature.geometry) {
      // For simplicity, we'll use the first coordinate for point features
      // or calculate a centroid for polygons
      let lat = 0,
        lng = 0

      if (feature.geometry.type === "Point") {
        ;[lng, lat] = feature.geometry.coordinates
      } else if (feature.geometry.type === "Polygon") {
        // Simple centroid calculation for polygons
        const coords = feature.geometry.coordinates[0]
        const sumCoords = coords.reduce(
          (acc: [number, number], coord: [number, number]) => [acc[0] + coord[0], acc[1] + coord[1]],
          [0, 0],
        )
        lng = sumCoords[0] / coords.length
        lat = sumCoords[1] / coords.length
      } else if (feature.geometry.type === "MultiPolygon") {
        // Use the first polygon for simplicity
        const coords = feature.geometry.coordinates[0][0][0][0]
        const sumCoords = coords.reduce(
          (acc: [number, number], coord: [number, number]) => [acc[0] + coord[0], acc[1] + coord[1]],
          [0, 0],
        )
        lng = sumCoords[0] / coords.length
        lat = sumCoords[1] / coords.length
      }

      return {
        id: country.id,
        name: country.name || feature.properties.NAME,
        value: country.value,
        lat,
        lng,
      }
    }

    // Fallback: generate a random point within Africa
    return {
      id: country.id,
      name: country.name,
      value: country.value,
      lat: Math.random() * 35 - 15, // Roughly -15 to 20 degrees latitude
      lng: Math.random() * 50 - 10, // Roughly -10 to 40 degrees longitude
    }
  })
}

// Generate time series point data
export function generateTimeSeriesPointData(timeSeriesData: any, geoJsonData: any) {
  if (!timeSeriesData) return null

  const result: { [key: string]: any[] } = {}

  Object.keys(timeSeriesData).forEach((timePoint) => {
    result[timePoint] = generatePointData(timeSeriesData[timePoint], geoJsonData)
  })

  return result
}

// Filter data based on value range
export function filterDataByValueRange(data: any[], minValue: number, maxValue: number) {
  return data.filter((item) => item.value >= minValue && item.value <= maxValue)
}

// Get data aggregation by region
export function aggregateDataByRegion(data: any[], geoJsonData: any) {
  if (!geoJsonData || !geoJsonData.features) return []

  // Define regions and their member countries
  const regions = {
    "North Africa": ["DZA", "EGY", "LBY", "MAR", "TUN", "ESH"],
    "West Africa": [
      "BEN",
      "BFA",
      "CPV",
      "CIV",
      "GMB",
      "GHA",
      "GIN",
      "GNB",
      "LBR",
      "MLI",
      "MRT",
      "NER",
      "NGA",
      "SEN",
      "SLE",
      "TGO",
    ],
    "East Africa": [
      "BDI",
      "COM",
      "DJI",
      "ERI",
      "ETH",
      "KEN",
      "MDG",
      "MWI",
      "MUS",
      "MOZ",
      "RWA",
      "SYC",
      "SOM",
      "SSD",
      "SDN",
      "TZA",
      "UGA",
    ],
    "Central Africa": ["AGO", "CMR", "CAF", "TCD", "COG", "COD", "GNQ", "GAB", "STP"],
    "Southern Africa": ["BWA", "LSO", "NAM", "ZAF", "SWZ", "ZMB", "ZWE"],
  }

  // Calculate aggregates
  return Object.entries(regions).map(([regionName, countryCodes]) => {
    const regionData = data.filter((item) => countryCodes.includes(item.id))
    const sum = regionData.reduce((acc, item) => acc + item.value, 0)
    const avg = regionData.length > 0 ? sum / regionData.length : 0

    return {
      id: regionName.replace(/\s+/g, ""),
      name: regionName,
      value: avg,
      min: Math.min(...regionData.map((item) => item.value)),
      max: Math.max(...regionData.map((item) => item.value)),
      count: regionData.length,
    }
  })
}
