import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, CheckCircle, Play, ImageIcon, Video } from "lucide-react"
import type { Project } from "@/lib/mock-data"

interface ProjectUpdatesProps {
  project: Project
}

export function ProjectUpdates({ project }: ProjectUpdatesProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-serif text-2xl text-trace-earth">Actualizaciones del proyecto</CardTitle>
        <p className="text-trace-earth/70">Mantente al día con el progreso y pruebas de avance</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {project.updates.length > 0 ? (
            project.updates.map((update) => {
              const linkedMilestone = update.milestoneId
                ? project.milestones.find((m) => m.id === update.milestoneId)
                : null

              return (
                <div key={update.id} className="border-b border-gray-100 last:border-b-0 pb-8 last:pb-0">
                  <div className="mb-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-trace-earth text-lg">{update.title}</h3>
                        {linkedMilestone && linkedMilestone.completed && (
                          <Badge className="bg-trace-forest text-white">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Hito completado
                          </Badge>
                        )}
                      </div>
                      <Badge variant="outline" className="border-trace-forest/30 text-trace-forest">
                        <Calendar className="w-3 h-3 mr-1" />
                        {new Date(update.date).toLocaleDateString("es-AR")}
                      </Badge>
                    </div>

                    <p className="text-trace-earth/80 leading-relaxed mb-4">{update.content}</p>

                    {update.media && update.media.length > 0 && (
                      <div className="space-y-4">
                        <div className="flex items-center gap-2 text-sm font-medium text-trace-earth">
                          <ImageIcon className="w-4 h-4" />
                          Evidencia del progreso ({update.media.length} archivos)
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {update.media.map((media) => (
                            <div key={media.id} className="group relative">
                              {media.type === "photo" ? (
                                <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-100">
                                  <Image
                                    src={media.url || "/placeholder.svg"}
                                    alt={media.caption || update.title}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-200"
                                  />
                                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                                </div>
                              ) : (
                                <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-100">
                                  <Image
                                    src={
                                      media.thumbnail || "/placeholder.svg?height=200&width=300&query=video thumbnail"
                                    }
                                    alt={media.caption || update.title}
                                    fill
                                    className="object-cover"
                                  />
                                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                                    <div className="bg-white/90 rounded-full p-3 group-hover:bg-white transition-colors">
                                      <Play className="w-6 h-6 text-trace-earth fill-current" />
                                    </div>
                                  </div>
                                  <Badge className="absolute top-2 left-2 bg-black/70 text-white">
                                    <Video className="w-3 h-3 mr-1" />
                                    Video
                                  </Badge>
                                </div>
                              )}

                              {media.caption && (
                                <p className="text-xs text-trace-earth/70 mt-2 leading-relaxed">{media.caption}</p>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {!update.media && update.imageUrl && (
                      <div className="mt-4">
                        <div className="relative aspect-video max-w-md rounded-lg overflow-hidden">
                          <Image
                            src={update.imageUrl || "/placeholder.svg"}
                            alt={update.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )
            })
          ) : (
            <div className="text-center py-8">
              <div className="text-trace-earth/50 mb-2">📝</div>
              <p className="text-trace-earth/70">Aún no hay actualizaciones para este proyecto</p>
              <p className="text-sm text-trace-earth/50 mt-1">
                Las actualizaciones con evidencia fotográfica aparecerán aquí cuando la organización publique novedades
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
