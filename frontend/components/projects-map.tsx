import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, ExternalLink } from "lucide-react"
import { InteractiveMap } from "@/components/interactive-map"
import type { Project } from "@/lib/mock-data"

interface ProjectsMapProps {
  projects: Project[]
}

export function ProjectsMap({ projects }: ProjectsMapProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl text-trace-earth">Mapa de Proyectos Apoyados</CardTitle>
        <p className="text-trace-earth/70">Visualiza el alcance geográfico de tu impacto social</p>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <InteractiveMap projects={projects} height="320px" />
        </div>

        {/* Project locations list */}
        <div className="space-y-3">
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
      </CardContent>
    </Card>
  )
}
