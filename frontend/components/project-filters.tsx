"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, X } from "lucide-react"

interface ProjectFiltersProps {
  onSearchChange: (search: string) => void
  onCategoryFilter: (category: string | null) => void
  onLocationFilter: (location: string | null) => void
  selectedCategory: string | null
  selectedLocation: string | null
}

const categories = [
  "Educación y Alimentación",
  "Educación y Tecnología",
  "Medio Ambiente",
  "Salud",
  "Infraestructura",
  "Desarrollo Comunitario",
]

const provinces = ["Buenos Aires", "Córdoba", "Salta", "Mendoza", "Santa Fe", "Tucumán", "Entre Ríos"]

export function ProjectFilters({
  onSearchChange,
  onCategoryFilter,
  onLocationFilter,
  selectedCategory,
  selectedLocation,
}: ProjectFiltersProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [showFilters, setShowFilters] = useState(false)

  const handleSearchChange = (value: string) => {
    setSearchTerm(value)
    onSearchChange(value)
  }

  const clearFilters = () => {
    onCategoryFilter(null)
    onLocationFilter(null)
    setSearchTerm("")
    onSearchChange("")
  }

  const hasActiveFilters = selectedCategory || selectedLocation || searchTerm

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-trace-earth/50 w-5 h-5" />
          <Input
            placeholder="Buscar proyectos por nombre o descripción..."
            value={searchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="pl-10 border-trace-forest/20 focus:border-trace-forest"
          />
        </div>

        {/* Filter Toggle */}
        <Button
          variant="outline" className="bg-white text-trace-forest border-trace-forest hover:bg-gray-100 hover:text-trace-forest"
          onClick={() => setShowFilters(!showFilters)}
          
        >
          <Filter className="w-4 h-4 mr-2" />
          Filtros
        </Button>

        {/* Clear Filters */}
        {hasActiveFilters && (
          <Button
            variant="ghost"
            onClick={clearFilters}
            className="text-trace-forest hover:bg-trace-forest hover:text-white bg-trace-alabaster/50"
          >
            <X className="w-4 h-4 mr-2" />
            Limpiar
          </Button>
        )}
      </div>

      {/* Expanded Filters */}
      {showFilters && (
        <div className="mt-6 pt-6 border-t border-gray-100 space-y-4">
          {/* Categories */}
          <div>
            <h4 className="font-semibold text-trace-earth mb-3">Categorías</h4>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Badge
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  className={`cursor-pointer transition-colors ${
                    selectedCategory === category
                      ? "badge-selected"
                      : // Fixed badge visibility with alabaster background
                        "bg-white text-trace-forest border-trace-forest hover:bg-gray-100"
                  }`}
                  onClick={() => onCategoryFilter(selectedCategory === category ? null : category)}
                >
                  {category}
                </Badge>
              ))}
            </div>
          </div>

          {/* Locations */}
          <div>
            <h4 className="font-semibold text-trace-earth mb-3">Provincias</h4>
            <div className="flex flex-wrap gap-2">
              {provinces.map((province) => (
                <Badge
                  key={province}
                  variant={selectedLocation === province ? "default" : "outline"}
                  className={`cursor-pointer transition-colors ${
                    selectedLocation === province
                      ? "badge-selected"
                      : // Fixed province badge visibility
                        "bg-white text-trace-forest border-trace-forest hover:bg-gray-100"
                  }`}
                  onClick={() => onLocationFilter(selectedLocation === province ? null : province)}
                >
                  {province}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex flex-wrap gap-2">
            {selectedCategory && (
              <Badge variant="secondary" className="bg-trace-forest/10 text-trace-forest">
                Categoría: {selectedCategory}
                <X className="w-3 h-3 ml-1 cursor-pointer" onClick={() => onCategoryFilter(null)} />
              </Badge>
            )}
            {selectedLocation && (
              <Badge variant="secondary" className="bg-trace-forest/10 text-trace-forest">
                Provincia: {selectedLocation}
                <X className="w-3 h-3 ml-1 cursor-pointer" onClick={() => onLocationFilter(null)} />
              </Badge>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
