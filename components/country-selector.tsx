"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { MapPin, X, Search } from "lucide-react"

// Sample list of African countries
const africanCountries = [
  "Algeria",
  "Angola",
  "Benin",
  "Botswana",
  "Burkina Faso",
  "Burundi",
  "Cabo Verde",
  "Cameroon",
  "Central African Republic",
  "Chad",
  "Comoros",
  "Congo",
  "Côte d'Ivoire",
  "Democratic Republic of the Congo",
  "Djibouti",
  "Egypt",
  "Equatorial Guinea",
  "Eritrea",
  "Eswatini",
  "Ethiopia",
  "Gabon",
  "Gambia",
  "Ghana",
  "Guinea",
  "Guinea-Bissau",
  "Kenya",
  "Lesotho",
  "Liberia",
  "Libya",
  "Madagascar",
  "Malawi",
  "Mali",
  "Mauritania",
  "Mauritius",
  "Morocco",
  "Mozambique",
  "Namibia",
  "Niger",
  "Nigeria",
  "Rwanda",
  "Sao Tome and Principe",
  "Senegal",
  "Seychelles",
  "Sierra Leone",
  "Somalia",
  "South Africa",
  "South Sudan",
  "Sudan",
  "Tanzania",
  "Togo",
  "Tunisia",
  "Uganda",
  "Zambia",
  "Zimbabwe",
]

interface CountrySelectorProps {
  onSelect: (country: string | null) => void
  selectedCountry: string | null
}

export default function CountrySelector({ onSelect, selectedCountry }: CountrySelectorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const filteredCountries = africanCountries.filter((country) =>
    country.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleSelectCountry = (country: string) => {
    onSelect(country)
    setIsOpen(false)
  }

  const handleClearSelection = () => {
    onSelect(null)
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <Button variant="outline" className="flex items-center gap-2 border-gray-300" onClick={() => setIsOpen(!isOpen)}>
        <MapPin className="h-4 w-4" />
        {selectedCountry ? (
          <div className="flex items-center">
            <span>{selectedCountry}</span>
            <button
              onClick={(e) => {
                e.stopPropagation()
                handleClearSelection()
              }}
              className="ml-2 text-gray-400 hover:text-gray-600"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        ) : (
          <span>Country selector</span>
        )}
      </Button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg z-50 border border-gray-200">
          <div className="p-2">
            <div className="relative mb-2">
              <input
                type="text"
                placeholder="Search countries..."
                className="w-full py-2 px-3 pr-8 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-africa-green"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
            </div>
            <div className="max-h-60 overflow-y-auto">
              {filteredCountries.length > 0 ? (
                filteredCountries.map((country) => (
                  <button
                    key={country}
                    className={`w-full text-left px-3 py-2 text-sm rounded hover:bg-gray-100 ${
                      selectedCountry === country ? "bg-gray-100 font-medium" : ""
                    }`}
                    onClick={() => handleSelectCountry(country)}
                  >
                    {country}
                  </button>
                ))
              ) : (
                <div className="px-3 py-2 text-sm text-gray-500">No countries found</div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
