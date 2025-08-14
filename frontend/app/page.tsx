"use client"

import { useState, useMemo } from "react"
import { Header } from "@/components/header"
import { ProjectCard } from "@/components/project-card"
import { ProjectFilters } from "@/components/project-filters"
import { mockProjects } from "@/lib/mock-data"

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null)

  const filteredProjects = useMemo(() => {
    return mockProjects.filter((project) => {
      const matchesSearch =
        project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.problemSolved.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesCategory = !selectedCategory || project.category === selectedCategory
      const matchesLocation = !selectedLocation || project.location.province === selectedLocation

      return matchesSearch && matchesCategory && matchesLocation
    })
  }, [searchTerm, selectedCategory, selectedLocation])

  return (
    <div className="min-h-screen bg-trace-alabaster">
      <Header />

      <section className="relative bg-gradient-to-br from-trace-alabaster via-white to-trace-alabaster text-trace-earth py-6 overflow-hidden">
        <div className="absolute inset-0 bg-trace-forest/5"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className=" text-xl md:text-2xl font-bold mb-4 text-trace-earth">
            Crowdfunding transparente con <span className="text-trace-cherry">trazabilidad total</span>
          </h1>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <div className="bg-white/80 backdrop-blur-sm rounded-lg px-6 py-3 border border-trace-forest/10 shadow-sm">
              <span className="text-trace-cherry font-bold text-xl">{mockProjects.length}</span>
              <span className="text-trace-earth ml-2 font-medium">proyectos activos</span>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-lg px-6 py-3 border border-trace-forest/10 shadow-sm">
              <span className="text-trace-cherry font-bold text-xl">
                ${mockProjects.reduce((sum, p) => sum + p.currentAmount, 0).toLocaleString()}
              </span>
              <span className="text-trace-earth ml-2 font-medium">recaudados</span>
            </div>
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ProjectFilters
          onSearchChange={setSearchTerm}
          onCategoryFilter={setSelectedCategory}
          onLocationFilter={setSelectedLocation}
          selectedCategory={selectedCategory}
          selectedLocation={selectedLocation}
        />

        {/* Results Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className=" text-3xl font-bold text-trace-earth">Proyectos de impacto</h2>
            <p className="text-trace-earth/70 mt-2">
              {filteredProjects.length} proyecto{filteredProjects.length !== 1 ? "s" : ""}
              {searchTerm || selectedCategory || selectedLocation
                ? " encontrado" + (filteredProjects.length !== 1 ? "s" : "")
                : " disponible" + (filteredProjects.length !== 1 ? "s" : "")}
            </p>
          </div>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="bg-white rounded-xl shadow-sm p-12">
              <h3 className=" text-2xl font-semibold text-trace-earth mb-4">No se encontraron proyectos</h3>
              <p className="text-trace-earth/70 mb-6">Intenta ajustar los filtros o términos de búsqueda</p>
              <button
                onClick={() => {
                  setSearchTerm("")
                  setSelectedCategory(null)
                  setSelectedLocation(null)
                }}
                className="text-trace-forest hover:text-trace-earth transition-colors"
              >
                Limpiar todos los filtros
              </button>
            </div>
          </div>
        )}

        {/* Call to Action */}
        <section className="mt-16 bg-trace-forest rounded-2xl p-8 md:p-12 text-center text-white">
          <h2 className=" text-3xl font-bold mb-4">¿Tienes un proyecto social?</h2>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            Únete a nuestra plataforma y accede a financiamiento transparente con trazabilidad completa. Cada donación
            es verificable y cada avance visible.
          </p>
          <button className="bg-trace-wheat text-trace-earth px-8 py-3 rounded-lg font-semibold hover:bg-white transition-colors">
            Registrar proyecto
          </button>
        </section>
      </main>
    </div>
  )
}
