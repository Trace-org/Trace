import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Circle, Clock } from "lucide-react"
import type { Project } from "@/lib/mock-data"
import { formatCurrency } from "@/lib/utils"

interface ProjectMilestonesProps {
  project: Project
}

export function ProjectMilestones({ project }: ProjectMilestonesProps) {
  return (
    <Card className="bg-white">
      <CardHeader>
        <CardTitle className="text-2xl text-trace-earth">Hitos del proyecto</CardTitle>
        <p className="text-trace-earth/70">El financiamiento se libera gradualmente al completar cada hito</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {project.milestones.map((milestone, index) => (
            <div key={milestone.id} className="relative">
              {/* Timeline connector */}
              {index < project.milestones.length - 1 && (
                <div className="absolute left-6 top-12 w-0.5 h-16 bg-trace-forest/20" />
              )}

              <div className="flex gap-4">
                {/* Status Icon */}
                <div className="flex-shrink-0 mt-1">
                  {milestone.completed ? (
                    <CheckCircle className="w-6 h-6 text-trace-forest" />
                  ) : milestone.percentage > 0 ? (
                    <Clock className="w-6 h-6 text-trace-wheat" />
                  ) : (
                    <Circle className="w-6 h-6 text-trace-earth/30" />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-trace-earth">{milestone.title}</h3>
                      <p className="text-sm text-trace-earth/70 mt-1">{milestone.description}</p>
                    </div>
                    <div className="text-right ml-4">
                      <Badge
                        variant={milestone.completed ? "default" : "outline"}
                        className={
                          milestone.completed
                            ? "bg-trace-forest text-white"
                            : "border-trace-forest/30 text-trace-forest"
                        }
                      >
                        {milestone.completed ? "Completado" : "En progreso"}
                      </Badge>
                      {milestone.completed && milestone.completedDate && (
                        <div className="text-xs text-trace-earth/60 mt-1">
                          {new Date(milestone.completedDate).toLocaleDateString("es-AR")}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Progress */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-trace-earth/70">
                        {formatCurrency(milestone.currentAmount)} / {formatCurrency(milestone.targetAmount)}
                      </span>
                      <span className="font-medium text-trace-forest">{milestone.percentage}%</span>
                    </div>
                    <Progress value={milestone.percentage} className="h-2" />
                  </div>

                  {/* Verification */}
                  {milestone.completed && (
                    <div className="bg-trace-forest/5 rounded-lg p-3 border border-trace-forest/20">
                      <div className="text-xs text-trace-forest font-medium mb-1">✓ Verificado automáticamente</div>
                      <div className="text-xs text-trace-earth/60">
                        Los fondos fueron liberados automáticamente tras verificación segura del hito
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
