import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { MapPin, Calendar, Shield } from "lucide-react"
import type { Project } from "@/lib/mock-data"
import { formatCurrency } from "@/lib/utils"

interface ProjectHeroProps {
  project: Project
}

export function ProjectHero({ project }: ProjectHeroProps) {
  const progressPercentage = (project.currentAmount / project.targetAmount) * 100

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      <div className="relative h-64 md:h-80">
        <Image src={project.imageUrl || "/placeholder.svg"} alt={project.name} fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute bottom-6 left-6 right-6">
          <div className="flex items-center gap-3 mb-4">
            <Badge variant="secondary" className="bg-white/90 text-trace-earth">
              <Shield className="w-3 h-3 mr-1" />
              {project.verified ? "Proyecto Verificado" : "En Verificación"}
            </Badge>
            <Badge variant="outline" className="bg-white/90 border-trace-forest text-trace-forest">
              {project.category}
            </Badge>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{project.name}</h1>
          <div className="flex items-center text-white/90">
            <MapPin className="w-4 h-4 mr-2" />
            <span>
              {project.location.city}, {project.location.province}
            </span>
          </div>
        </div>
      </div>

      <div className="p-6 md:p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="text-center">
            <div className="text-2xl font-bold text-trace-forest">{formatCurrency(project.currentAmount)}</div>
            <div className="text-sm text-trace-earth/70">recaudado</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-trace-earth">{project.donorsCount}</div>
            <div className="text-sm text-trace-earth/70">donantes</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-trace-cherry">{project.daysLeft}</div>
            <div className="text-sm text-trace-earth/70">días restantes</div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-trace-earth/70">Progreso del financiamiento</span>
            <span className="font-semibold text-trace-forest">{progressPercentage.toFixed(1)}% completado</span>
          </div>
          <Progress value={progressPercentage} className="h-3" />
          <div className="flex justify-between text-sm text-trace-earth/70">
            <span>Meta: {formatCurrency(project.targetAmount)}</span>
            <span>
              <Calendar className="w-4 h-4 inline mr-1" />
              Hasta {new Date(project.deadline).toLocaleDateString("es-AR")}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
