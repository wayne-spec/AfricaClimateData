import Image from "next/image"

interface AIImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  fill?: boolean
  className?: string
  priority?: boolean
}

export default function AIImage({
  src,
  alt,
  width,
  height,
  fill = false,
  className = "",
  priority = false,
}: AIImageProps) {
  // This component can be used to easily swap between placeholder images and AI-generated images
  // Just replace the placeholder URL with your AI-generated image URL

  // For development/placeholder
  const placeholderSrc = fill ? `/placeholder.svg?height=${height || 300}&width=${width || 500}` : src

  // For production with AI-generated images
  // const imageSrc = src;

  return (
    <Image
      src={placeholderSrc || "/placeholder.svg"} // Change to imageSrc when you have AI-generated images
      alt={alt}
      width={fill ? undefined : width || 500}
      height={fill ? undefined : height || 300}
      fill={fill}
      className={className}
      priority={priority}
    />
  )
}
