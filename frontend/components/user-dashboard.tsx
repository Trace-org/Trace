import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Heart, MapPin, Calendar, TrendingUp } from "lucide-react"
import Link from "next/link"
import { formatCurrency } from "@/lib/utils"

interface UserStats {
  totalDonated: number
  projectsSupported: number
  impactPoints: number
  lastDonation: string
  favoriteCategory: string
  donationHistory: Array<{
    id: string
    projectName: string
    amount: number
    date: string
    category: string
    projectId: string
  }>
}

const mockUserStats: UserStats = {
  totalDonated: 15750,
  projectsSupported: 8,
  impactPoints: 1240,
  lastDonation: "2024-01-10",
  favoriteCategory: "Educación",
  donationHistory: [
    {
      id: "1",
      projectName: "Escuela Rural San Miguel",
      amount: 5000,
      date: "2024-01-10",
      category: "Educación",
      projectId: "1",
    },
    {
      id: "2",
      projectName: "Biblioteca Comunitaria",
      amount: 3500,
      date: "2023-12-15",
      category: "Educación",
      projectId: "2",
    },
    {
      id: "3",
      projectName: "Centro de Salud Rural",
      amount: 7250,
      date: "2023-11-20",
      category: "Salud",
      projectId: "3",
    },
  ],
}

export function UserDashboard() {
  const stats = mockUserStats

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold text-trace-earth">Mi Impacto</h1>
        <p className="text-trace-earth/70">Tu contribución al cambio social</p>
      </div>

      {/* Key Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-trace-forest/20">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-trace-forest">{formatCurrency(stats.totalDonated)}</div>
            <div className="text-sm text-trace-earth/70">Total Donado</div>
          </CardContent>
        </Card>

        <Card className="border-trace-cherry/20">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-trace-cherry">{stats.projectsSupported}</div>
            <div className="text-sm text-trace-earth/70">Proyectos Apoyados</div>
          </CardContent>
        </Card>

        <Card className="border-trace-wheat/20">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-trace-wheat">{stats.impactPoints}</div>
            <div className="text-sm text-trace-earth/70">Puntos de Impacto</div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity & Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Donations */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-trace-earth">
              <Heart className="h-5 w-5" />
              Donaciones Recientes
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {stats.donationHistory.slice(0, 3).map((donation) => (
              <Link key={donation.id} href={`/project/${donation.projectId}`}>
                <div className="flex items-center justify-between p-3 bg-trace-alabaster/50 rounded-lg">
                  <div className="space-y-1">
                    <div className="font-medium text-trace-earth text-sm">{donation.projectName}</div>
                    <div className="flex items-center gap-2 text-xs text-trace-earth/60">
                      <Calendar className="h-3 w-3" />
                      {new Date(donation.date).toLocaleDateString("es-AR")}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-trace-forest">{formatCurrency(donation.amount)}</div>
                    <Badge variant="outline" className="text-xs border-trace-cherry/30 text-trace-cherry">
                      {donation.category}
                    </Badge>
                  </div>
                </div>
              </Link>
            ))}
          </CardContent>
        </Card>

        {/* Impact Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-trace-earth">
              <TrendingUp className="h-5 w-5" />
              Tu Impacto
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-trace-earth/70">Categoría Favorita</span>
                <span className="font-medium text-trace-earth">{stats.favoriteCategory}</span>
              </div>
              <Progress value={75} className="h-2" />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-trace-earth/70">Meta Anual</span>
                <span className="font-medium text-trace-earth">52%</span>
              </div>
              <Progress value={52} className="h-2" />
            </div>

            <div className="pt-3 border-t border-trace-forest/10">
              <div className="flex items-center gap-2 text-sm text-trace-earth/70">
                <MapPin className="h-4 w-4" />
                <span>Impacto en 3 provincias argentinas</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
