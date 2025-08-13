import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { MapPin, Calendar, Users } from "lucide-react"
import type { Project } from "@/lib/mock-data"

interface ProjectCardProps {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  const progressPercentage = (project.currentAmount / project.targetAmount) * 100
  

  return (
    <Link href={`/proyecto/${project.id}`} className="block h-full">
      <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 hover:border-trace-forest/20 h-full flex flex-col">
        <div className="relative h-48 overflow-hidden flex-shrink-0">
          <Image
            src={project.imageUrl || "/placeholder.svg"}
            alt={project.name}
            fill
            className="object-cover hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-3 right-3">
            <Badge variant="secondary" className="bg-white/90 text-trace-earth">
              {project.verified ? "✓ Verificado" : "Pendiente"}
            </Badge>
          </div>
        </div>

        <div className="p-6 flex-1 flex flex-col">
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-xl font-semibold text-trace-earth line-clamp-2 flex-1">{project.name}</h3>
          </div>

          <div className="flex items-center text-sm text-trace-earth/70 mb-2">
            <MapPin className="w-4 h-4 mr-1" />
            <span>
              {project.location.city}, {project.location.province}
            </span>
          </div>

          <p className="text-sm text-trace-earth/80 mb-4 line-clamp-2 flex-1">{project.problemSolved}</p>

          <div className="mb-4">
            <Badge variant="outline" className="text-xs border-trace-forest/30 text-trace-forest">
              {project.category}
            </Badge>
          </div>

          <div className="space-y-3 mt-auto">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-trace-earth/70">Recaudado</span>
                <span className="font-semibold text-trace-forest">
                  ${project.currentAmount.toLocaleString()} / ${project.targetAmount.toLocaleString()}
                </span>
              </div>
              <Progress value={progressPercentage} className="h-2" />
            </div>

            <div className="flex items-center justify-between text-sm text-trace-earth/70">
              <div className="flex items-center">
                <Users className="w-4 h-4 mr-1" />
                <span>{project.donorsCount} donantes</span>
              </div>
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                <span>{project.daysLeft} días restantes</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
