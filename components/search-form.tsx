"use client"

import { useState, type FormEvent } from "react"
import { useRouter } from "next/navigation"
import { Search } from "lucide-react"

export default function SearchForm({
  placeholder = 'Try "Life expectancy", "Poverty Nigeria Vietnam", "CO2 France"...',
}) {
  const [query, setQuery] = useState("")
  const router = useRouter()

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl relative">
      <input
        type="text"
        placeholder={placeholder}
        className="w-full py-3 px-4 rounded text-black pr-10"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button type="submit" className="absolute right-3 top-3 text-gray-400">
        <Search size={20} />
      </button>
    </form>
  )
}
