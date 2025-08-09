import Link from "next/link"

interface TopicButtonProps {
  label: string
}

const TopicButton = ({ label }: TopicButtonProps) => {
  // Convert label to URL-friendly format
  const slug = label.toLowerCase().replace(/\s+/g, "-")

  return (
    <Link
      href={`/topics/${slug}`}
      className="inline-block px-3 py-1 text-sm bg-white border border-gray-300 rounded-full hover:bg-gray-100 transition-colors"
    >
      {label}
    </Link>
  )
}

export default TopicButton
