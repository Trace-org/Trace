import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Building2, Target, AlertCircle } from "lucide-react"
import type { Project } from "@/lib/mock-data"

interface ProjectDetailsProps {
  project: Project
}

export function ProjectDetails({ project }: ProjectDetailsProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="font-serif text-2xl text-trace-earth">Sobre este proyecto</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="font-semibold text-trace-earth mb-2">Descripción</h3>
            <p className="text-trace-earth/80 leading-relaxed">{project.description}</p>
          </div>

          <div>
            <h3 className="font-semibold text-trace-earth mb-2 flex items-center">
              <AlertCircle className="w-4 h-4 mr-2 text-trace-cherry" />
              Problema que resuelve
            </h3>
            <p className="text-trace-earth/80 leading-relaxed">{project.problemSolved}</p>
          </div>

          <div>
            <h3 className="font-semibold text-trace-earth mb-2 flex items-center justify-between">
              <span className="flex items-center">
                <Target className="w-4 h-4 mr-2 text-trace-forest" />
                Objetivo de impacto
              </span>
            </h3>
            <p className="text-trace-earth/80 leading-relaxed">
              Este proyecto busca generar un impacto directo en la comunidad de {project.location.city}, abordando
              necesidades específicas en el área de {project.category.toLowerCase()}.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-trace-earth mb-2 flex items-center">
              <Building2 className="w-4 h-4 mr-2 text-trace-forest" />
              Organización responsable
            </h3>
            <div className="space-y-2">
              <span className="text-trace-earth/80">{project.organizationName}</span>
              <div className="flex justify-start">
                <Badge variant="outline" className="border-trace-forest/30 text-trace-forest text-xs">
                  Verificada
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="font-serif text-2xl text-trace-earth">Transparencia total</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-trace-forest/5 rounded-lg p-4 border border-trace-forest/20">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold text-trace-forest">🔗 Trazabilidad completa</h4>
              <Badge variant="outline" className="border-trace-forest/30 text-trace-forest text-xs">
                Verificada
              </Badge>
            </div>
            <p className="text-sm text-trace-earth/80 mb-3">
              Todas las donaciones y gastos de este proyecto están registrados de forma segura, garantizando
              transparencia completa y trazabilidad de cada peso donado con tecnología avanzada.
            </p>
            <div className="text-xs text-trace-earth/60">
              ID de verificación: 0x{project.id}...abc123 • Sistema: Seguro y descentralizado
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
