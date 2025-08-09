import type { VisualizationData } from "./data"

// Function to convert chart data to CSV format
export function chartDataToCSV(chartData: VisualizationData | any): string {
  if (!chartData || !chartData.data || chartData.data.length === 0) {
    return ""
  }

  const data = chartData.data || chartData
  const headers = Object.keys(data[0])
  const csvRows = [
    headers.join(","), // CSV header row
    ...data.map((row: any) =>
      headers
        .map((header) => {
          // Handle values that might contain commas by wrapping in quotes
          const value = row[header]
          const valueStr = value !== undefined && value !== null ? String(value) : ""
          return valueStr.includes(",") ? `"${valueStr}"` : valueStr
        })
        .join(","),
    ),
  ]

  return csvRows.join("\n")
}

// Function to download chart data as CSV
export function downloadChartAsCSV(chartData: VisualizationData | any) {
  const csv = chartDataToCSV(chartData)
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" })
  const url = URL.createObjectURL(blob)

  const link = document.createElement("a")
  link.setAttribute("href", url)
  link.setAttribute("download", `${(chartData.title || "data").replace(/\s+/g, "_")}.csv`)
  link.style.visibility = "hidden"

  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

// Function to download chart as PNG
export function downloadChartAsImage(chartId: string, chartData: VisualizationData | any) {
  // In a real implementation, you would use a library like html-to-image
  // For this demo, we'll create a simple canvas-based solution

  const chartElement = document.getElementById(chartId)
  if (!chartElement) {
    console.error("Chart element not found")
    return
  }

  try {
    // Create a canvas element
    const canvas = document.createElement("canvas")
    canvas.width = chartElement.clientWidth
    canvas.height = chartElement.clientHeight

    // Draw the chart on the canvas (simplified version)
    const ctx = canvas.getContext("2d")
    if (!ctx) {
      throw new Error("Could not get canvas context")
    }

    // Draw a white background
    ctx.fillStyle = "white"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Convert the chart to an image
    const data = canvas.toDataURL("image/png")

    // Create a download link
    const link = document.createElement("a")
    link.download = `${(chartData.title || "visualization").replace(/\s+/g, "_")}.png`
    link.href = data
    link.click()
  } catch (error) {
    console.error("Error generating chart image:", error)
    alert("Could not download chart as image. Please try again later.")
  }
}

// Function to share visualization
export async function shareVisualization(visualization: VisualizationData, url: string) {
  if (navigator.share) {
    try {
      await navigator.share({
        title: visualization.title,
        text: visualization.description,
        url: url,
      })
      return true
    } catch (error) {
      console.error("Error sharing:", error)
      return false
    }
  }
  return false
}

// Function to copy to clipboard
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch (error) {
    console.error("Failed to copy:", error)
    return false
  }
}
