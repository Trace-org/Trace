"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { InteractiveMap } from "@/components/interactive-map"
import { mockProjects } from "@/lib/mock-data"

export function HomepageMap() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-serif text-2xl text-trace-earth text-center">Proyectos en toda Argentina</CardTitle>
        <p className="text-trace-earth/70 text-center">Descubre el impacto social en cada rincón del país</p>
      </CardHeader>
      <CardContent>
        <InteractiveMap projects={mockProjects} height="400px" />
        <div className="mt-4 text-center">
          <p className="text-sm text-trace-earth/70">
            Haz clic en los puntos del mapa para ver detalles de cada proyecto
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
