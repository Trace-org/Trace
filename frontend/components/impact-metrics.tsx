import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Users, MapPin, Target } from "lucide-react"
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis } from "recharts"
import { ChartTooltip } from "@/components/ui/chart"
import type { CompanyStats } from "@/lib/mock-data"

interface ImpactMetricsProps {
  stats: CompanyStats
}

export function ImpactMetrics({ stats }: ImpactMetricsProps) {
  // Mock annual goal for demonstration
  const annualGoal = 60000
  const progressToGoal = (stats.totalDonated / annualGoal) * 100

  const impactByCategory = [
    { name: "Educación", value: 45, color: "#327039" },
    { name: "Salud", value: 30, color: "#f0be49" },
    { name: "Infraestructura", value: 25, color: "#ff6b47" },
  ]

  const monthlyImpact = [
    { month: "Ene", people: Math.floor(stats.impactMetrics.peopleHelped * 0.15) },
    { month: "Feb", people: Math.floor(stats.impactMetrics.peopleHelped * 0.25) },
    { month: "Mar", people: Math.floor(stats.impactMetrics.peopleHelped * 0.35) },
    { month: "Abr", people: Math.floor(stats.impactMetrics.peopleHelped * 0.5) },
    { month: "May", people: Math.floor(stats.impactMetrics.peopleHelped * 0.75) },
    { month: "Jun", people: stats.impactMetrics.peopleHelped },
  ]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Impact Overview */}
      <Card>
        <CardHeader>
          <CardTitle className=" text-xl text-trace-earth">Impacto Social</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Users className="w-5 h-5 text-trace-forest mr-3" />
              <span className="text-trace-earth/70">Personas beneficiadas</span>
            </div>
            <span className="text-xl font-bold text-trace-forest">{stats.impactMetrics.peopleHelped}</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <MapPin className="w-5 h-5 text-trace-cherry mr-3" />
              <span className="text-trace-earth/70">Comunidades alcanzadas</span>
            </div>
            <span className="text-xl font-bold text-trace-cherry">{stats.impactMetrics.communitiesReached}</span>
          </div>

          <div>
            <h4 className="font-semibold text-trace-earth mb-3">Objetivos de Desarrollo Sostenible</h4>
            <div className="flex flex-wrap gap-2">
              {stats.impactMetrics.sdgGoals.map((goal, index) => (
                <Badge key={index} variant="outline" className="border-trace-forest/30 text-trace-forest">
                  {goal}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Annual Goal Progress */}
      <Card>
        <CardHeader>
          <CardTitle className=" text-xl text-trace-earth">Meta Anual 2025</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-trace-forest mb-2">${stats.totalDonated.toLocaleString()}</div>
            <div className="text-trace-earth/70">de ${annualGoal.toLocaleString()} objetivo</div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-trace-earth/70">Progreso</span>
              <span className="font-medium text-trace-forest">{progressToGoal.toFixed(1)}%</span>
            </div>
            <Progress value={progressToGoal} className="h-3" />
          </div>

          <div className="bg-trace-forest/5 rounded-lg p-4 border border-trace-forest/20">
            <div className="flex items-center mb-2">
              <Target className="w-4 h-4 text-trace-forest mr-2" />
              <span className="font-semibold text-trace-forest">Beneficio fiscal</span>
            </div>
            <p className="text-sm text-trace-earth/80">
              Al alcanzar tu meta anual, maximizarás tu deducción fiscal y el impacto social de tu empresa.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className=" text-xl text-trace-earth">Distribución por Categoría</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={impactByCategory}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {impactByCategory.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <ChartTooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload
                      return (
                        <div className="bg-white p-3 border border-trace-forest/20 rounded-lg shadow-lg">
                          <p className="text-trace-earth font-medium">{data.name}</p>
                          <p className="text-trace-forest">{data.value}%</p>
                        </div>
                      )
                    }
                    return null
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-4 mt-4">
            {impactByCategory.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-sm text-trace-earth/70">{item.name}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className=" text-xl text-trace-earth">Crecimiento del Impacto</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyImpact}>
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "#133020", fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: "#133020", fontSize: 12 }} />
                <ChartTooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-white p-3 border border-trace-forest/20 rounded-lg shadow-lg">
                          <p className="text-trace-earth font-medium">{label}</p>
                          <p className="text-trace-forest">Personas: {payload[0].value?.toLocaleString()}</p>
                        </div>
                      )
                    }
                    return null
                  }}
                />
                <Bar dataKey="people" fill="#327039" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
