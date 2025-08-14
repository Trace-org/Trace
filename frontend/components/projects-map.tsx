import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, ExternalLink } from "lucide-react"
import dynamic from "next/dynamic"
import type { Project } from "@/lib/mock-data"

const LeafletArgentinaMap = dynamic(() => import("@/components/leaflet-argentina-map"), {
  ssr: false,
})

interface ProjectsMapProps {
  projects: Project[]
}

export function ProjectsMap({ projects }: ProjectsMapProps) {
  const mapHeight = "620px"

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl text-trace-earth">Mapa de Proyectos Apoyados</CardTitle>
        <p className="text-trace-earth/70">Visualiza el alcance geográfico de tu impacto social</p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Columna izquierda: Mapa */}
          <div>
            <LeafletArgentinaMap projects={projects} height={mapHeight} />
          </div>

          {/* Columna derecha: Lista de proyectos */}
          <div className="space-y-3" style={{ maxHeight: mapHeight, overflowY: "auto" }}>
            <h4 className="font-semibold text-trace-earth">Proyectos por ubicación:</h4>
            {projects.map((project) => (
              <div
                key={project.id}
                className="flex items-center justify-between p-3 bg-white rounded-lg border border-trace-forest/10"
              >
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-trace-forest rounded-full"></div>
                  <div>
                    <h5 className="font-medium text-trace-earth">{project.name}</h5>
                    <div className="flex items-center text-sm text-trace-earth/70">
                      <MapPin className="w-3 h-3 mr-1" />
                      {project.location.city}, {project.location.province}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="border-trace-forest/30 text-trace-forest">
                    {project.category}
                  </Badge>
                  <button className="text-trace-forest hover:text-trace-earth">
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
