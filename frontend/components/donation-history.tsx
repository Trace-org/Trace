import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Receipt } from "lucide-react"
import type { CompanyDonation, Project } from "@/lib/mock-data"

interface DonationHistoryProps {
  donations: CompanyDonation[]
  projects: Project[]
}

export function DonationHistory({ donations, projects }: DonationHistoryProps) {
  const getProjectById = (id: string) => projects.find((p) => p.id === id)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-serif text-xl text-trace-earth">Historial de Donaciones</CardTitle>
        <p className="text-trace-earth/70">Todas tus contribuciones verificadas y trazables</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {donations.map((donation) => {
            const project = getProjectById(donation.projectId)
            if (!project) return null

            return (
              <div
                key={donation.id}
                className="flex items-center justify-between p-4 bg-trace-alabaster rounded-lg border border-trace-forest/10"
              >
                <div className="flex-1">
                  <h4 className="font-semibold text-trace-earth mb-1">{project.name}</h4>
                  <div className="flex items-center gap-4 text-sm text-trace-earth/70">
                    <div className="flex items-center">
                      <MapPin className="w-3 h-3 mr-1" />
                      {project.location.city}, {project.location.province}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-3 h-3 mr-1" />
                      {new Date(donation.date).toLocaleDateString("es-AR")}
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-lg font-bold text-trace-forest">${donation.amount.toLocaleString()}</div>
                  <div className="flex items-center gap-2 mt-1">
                    {donation.taxDeductible && (
                      <Badge variant="outline" className="border-trace-forest/30 text-trace-forest text-xs">
                        <Receipt className="w-3 h-3 mr-1" />
                        Deducible
                      </Badge>
                    )}
                    <Badge variant="secondary" className="bg-trace-forest/10 text-trace-forest text-xs">
                      Verificado
                    </Badge>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
