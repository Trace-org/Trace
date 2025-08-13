"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { MapPin, ExternalLink } from "lucide-react"
import type { Project } from "@/lib/mock-data"

interface InteractiveMapProps {
  projects: Project[]
  height?: string
}

export function InteractiveMap({ projects, height = "400px" }: InteractiveMapProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  const getMarkerPosition = (coordinates: [number, number]) => {
    // Convert lat/lng to approximate pixel positions for Argentina map
    const [lng, lat] = coordinates
    // Argentina bounds: lng: -73.5 to -53.6, lat: -55.1 to -21.8
    const leftPercent = ((lng + 73.5) / 19.9) * 100
    const topPercent = ((lat + 55.1) / 33.3) * 100
    return {
      left: `${Math.max(5, Math.min(95, leftPercent))}%`,
      top: `${Math.max(5, Math.min(95, 100 - topPercent))}%`,
    }
  }

  return (
    <div className="relative">
      <div
        style={{ height }}
        className="relative rounded-lg overflow-hidden border border-trace-forest/20 bg-gradient-to-br from-gray-100 to-gray-200"
      >
        <div className="absolute inset-0 bg-gray-300/30">
          <svg
            viewBox="0 0 300 500"
            className="w-full h-full opacity-20"
            fill="currentColor"
            style={{ color: "#327039" }}
          >
            {/* More accurate Argentina outline */}
            <path d="M150 20 L140 30 L130 45 L125 60 L120 80 L115 100 L110 120 L105 140 L100 160 L95 180 L90 200 L85 220 L80 240 L75 260 L70 280 L65 300 L60 320 L55 340 L50 360 L45 380 L40 400 L35 420 L30 440 L35 460 L45 475 L60 485 L80 490 L100 485 L120 480 L140 475 L160 470 L180 465 L200 455 L215 440 L225 420 L230 400 L235 380 L240 360 L245 340 L250 320 L255 300 L260 280 L265 260 L270 240 L275 220 L280 200 L275 180 L270 160 L265 140 L260 120 L255 100 L250 80 L240 60 L230 45 L220 35 L200 25 L180 20 L160 18 Z" />
          </svg>
        </div>

        {/* Project markers */}
        {projects.map((project) => {
          const position = getMarkerPosition(project.location.coordinates)
          return (
            <button
              key={project.id}
              className="absolute w-5 h-5 bg-trace-forest border-2 border-white rounded-full shadow-lg hover:bg-trace-wheat hover:scale-125 transition-all duration-200 z-10"
              style={position}
              onClick={() => setSelectedProject(project)}
              title={project.name}
            />
          )
        })}

        <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 text-xs">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-3 h-3 bg-trace-forest rounded-full"></div>
            <span className="text-trace-earth">Proyectos en Argentina</span>
          </div>
          <div className="text-trace-earth/70">Haz clic para ver detalles</div>
        </div>
      </div>

      {/* Project details popup */}
      {selectedProject && (
        <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg border border-trace-forest/20 p-4 max-w-sm z-20">
          <div className="flex items-start justify-between mb-3">
            <h3 className="font-serif text-lg font-semibold text-trace-earth line-clamp-2">{selectedProject.name}</h3>
            <button
              onClick={() => setSelectedProject(null)}
              className="text-trace-earth/50 hover:text-trace-earth ml-2 text-xl leading-none"
            >
              ×
            </button>
          </div>

          <div className="space-y-3">
            <div className="flex items-center text-sm text-trace-earth/70">
              <MapPin className="w-4 h-4 mr-1" />
              <span>
                {selectedProject.location.city}, {selectedProject.location.province}
              </span>
            </div>

            <p className="text-sm text-trace-earth/80 line-clamp-3">{selectedProject.problemSolved}</p>

            <div className="flex items-center gap-2">
              <Badge variant="outline" className="border-trace-forest/30 text-trace-forest text-xs">
                {selectedProject.category}
              </Badge>
              {selectedProject.verified && (
                <Badge variant="secondary" className="bg-trace-forest/10 text-trace-forest text-xs">
                  ✓ Verificado
                </Badge>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-semibold text-trace-forest">
                  ${selectedProject.currentAmount.toLocaleString()}
                </span>
                <span className="text-trace-earth/70">de ${selectedProject.targetAmount.toLocaleString()}</span>
              </div>
              <Progress value={(selectedProject.currentAmount / selectedProject.targetAmount) * 100} className="h-2" />
              <div className="text-xs text-trace-earth/70 text-center">
                {Math.round((selectedProject.currentAmount / selectedProject.targetAmount) * 100)}% financiado
              </div>
            </div>

            <div className="flex justify-end pt-2 border-t border-gray-100">
              <button className="flex items-center text-trace-forest hover:text-trace-earth text-sm">
                <ExternalLink className="w-4 h-4 mr-1" />
                Ver proyecto
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
