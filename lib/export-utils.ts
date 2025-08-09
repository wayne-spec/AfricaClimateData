import saveAs from "file-saver"
import { toPng, toSvg } from "html-to-image"
import { jsPDF } from "jspdf"

// Function to prepare element for export
const prepareElementForExport = async (elementId: string): Promise<HTMLElement> => {
  const element = document.getElementById(elementId)
  if (!element) throw new Error("Element not found")

  // Clone the element to avoid modifying the original
  const clone = element.cloneNode(true) as HTMLElement

  // Create a temporary container
  const container = document.createElement("div")
  container.style.position = "absolute"
  container.style.left = "-9999px"
  container.style.top = "-9999px"
  container.appendChild(clone)
  document.body.appendChild(container)

  // Add logo to the right if it doesn't exist
  const existingLogos = clone.querySelectorAll("[data-logo]")
  if (existingLogos.length === 0) {
    // Create a new logo element
    const logoContainer = document.createElement("div")
    logoContainer.className = "absolute top-2 right-2 z-10"
    logoContainer.setAttribute("data-logo", "right")

    const logoInner = document.createElement("div")
    logoInner.className = "bg-white/90 p-1 rounded-md shadow-sm"

    const logoImg = document.createElement("img")
    logoImg.src = "/images/logo.png"
    logoImg.alt = "Africa Climate Data Platform"
    logoImg.width = 100
    logoImg.height = 30
    logoImg.className = "object-contain"

    logoInner.appendChild(logoImg)
    logoContainer.appendChild(logoInner)
    clone.appendChild(logoContainer)
  }

  // Wait for images to load
  await new Promise((resolve) => setTimeout(resolve, 100))

  return container
}

// Function to clean up after export
const cleanupAfterExport = (container: HTMLElement) => {
  if (container && container.parentNode) {
    container.parentNode.removeChild(container)
  }
}

// Function to export chart as PNG
export async function exportAsPng(elementId: string, filename: string): Promise<void> {
  let container: HTMLElement | null = null

  try {
    container = await prepareElementForExport(elementId)
    const clone = container.firstChild as HTMLElement

    const dataUrl = await toPng(clone, {
      quality: 0.95,
      backgroundColor: "white",
      canvasWidth: clone.clientWidth * 2,
      canvasHeight: clone.clientHeight * 2,
      pixelRatio: 2,
    })

    saveAs(dataUrl, `${filename}.png`)
    return Promise.resolve()
  } catch (error) {
    console.error("Error exporting as PNG:", error)
    return Promise.reject(error)
  } finally {
    if (container) cleanupAfterExport(container)
  }
}

// Function to export chart as SVG
export async function exportAsSvg(elementId: string, filename: string): Promise<void> {
  let container: HTMLElement | null = null

  try {
    container = await prepareElementForExport(elementId)
    const clone = container.firstChild as HTMLElement

    const dataUrl = await toSvg(clone, {
      backgroundColor: "white",
      canvasWidth: clone.clientWidth,
      canvasHeight: clone.clientHeight,
    })

    saveAs(dataUrl, `${filename}.svg`)
    return Promise.resolve()
  } catch (error) {
    console.error("Error exporting as SVG:", error)
    return Promise.reject(error)
  } finally {
    if (container) cleanupAfterExport(container)
  }
}

// Function to export chart as PDF
export async function exportAsPdf(elementId: string, filename: string): Promise<void> {
  let container: HTMLElement | null = null

  try {
    container = await prepareElementForExport(elementId)
    const clone = container.firstChild as HTMLElement

    const canvas = await toPng(clone, {
      backgroundColor: "white",
      canvasWidth: clone.clientWidth * 2,
      canvasHeight: clone.clientHeight * 2,
      pixelRatio: 2,
    })

    const pdf = new jsPDF({
      orientation: clone.clientWidth > clone.clientHeight ? "landscape" : "portrait",
      unit: "mm",
    })

    // Calculate aspect ratio
    const imgProps = pdf.getImageProperties(canvas)
    const pdfWidth = pdf.internal.pageSize.getWidth() - 20
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width

    pdf.addImage(canvas, "PNG", 10, 10, pdfWidth, pdfHeight)
    pdf.save(`${filename}.pdf`)

    return Promise.resolve()
  } catch (error) {
    console.error("Error exporting as PDF:", error)
    return Promise.reject(error)
  } finally {
    if (container) cleanupAfterExport(container)
  }
}

// Function to handle all export types
export async function exportVisualization(
  elementId: string,
  filename: string,
  type: "png" | "svg" | "pdf",
): Promise<void> {
  // Show loading indicator
  const element = document.getElementById(elementId)
  if (element) {
    const loadingEl = document.createElement("div")
    loadingEl.className = "absolute inset-0 bg-white/80 flex items-center justify-center z-50"
    loadingEl.innerHTML = '<div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>'
    loadingEl.id = "export-loading"
    element.style.position = "relative"
    element.appendChild(loadingEl)
  }

  try {
    switch (type) {
      case "png":
        await exportAsPng(elementId, filename)
        break
      case "svg":
        await exportAsSvg(elementId, filename)
        break
      case "pdf":
        await exportAsPdf(elementId, filename)
        break
      default:
        throw new Error("Unsupported export type")
    }
  } finally {
    // Remove loading indicator
    const loadingEl = document.getElementById("export-loading")
    if (loadingEl && loadingEl.parentNode) {
      loadingEl.parentNode.removeChild(loadingEl)
    }
  }
}
