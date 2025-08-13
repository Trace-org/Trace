import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, Heart, Building2, Receipt } from "lucide-react"
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { ChartTooltip } from "@/components/ui/chart"
import type { CompanyStats } from "@/lib/mock-data"

interface DashboardStatsProps {
  stats: CompanyStats
}

export function DashboardStats({ stats }: DashboardStatsProps) {
  const statsData = [
    {
      title: "Total Donado",
      value: `$${stats.totalDonated.toLocaleString()}`,
      icon: Heart,
      color: "text-trace-forest",
      bgColor: "bg-trace-forest/10",
    },
    {
      title: "Proyectos Apoyados",
      value: stats.projectsSupported.toString(),
      icon: Building2,
      color: "text-trace-wheat",
      bgColor: "bg-trace-wheat/20",
    },
    {
      title: "Personas Beneficiadas",
      value: stats.impactMetrics.peopleHelped.toLocaleString(),
      icon: TrendingUp,
      color: "text-trace-cherry",
      bgColor: "bg-trace-cherry/10",
    },
    {
      title: "Deducción Fiscal",
      value: `$${stats.taxDeductions.toLocaleString()}`,
      icon: Receipt,
      color: "text-trace-earth",
      bgColor: "bg-trace-earth/10",
    },
  ]

  const donationTrends = [
    { month: "Ene", amount: 8000 },
    { month: "Feb", amount: 12000 },
    { month: "Mar", amount: 15000 },
    { month: "Abr", amount: 18000 },
    { month: "May", amount: 22000 },
    { month: "Jun", amount: stats.totalDonated },
  ]

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsData.map((stat, index) => (
          <Card key={index} className="border-trace-forest/20 hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-trace-earth/70 mb-1">{stat.title}</p>
                  <p className="text-2xl font-bold text-trace-earth">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-full ${stat.bgColor}`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="font-serif text-xl text-trace-earth">Tendencia de Donaciones 2025</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={donationTrends}>
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "#133020", fontSize: 12 }} />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#133020", fontSize: 12 }}
                  tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                />
                <ChartTooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-white p-3 border border-trace-forest/20 rounded-lg shadow-lg">
                          <p className="text-trace-earth font-medium">{label}</p>
                          <p className="text-trace-forest">Donaciones: ${payload[0].value?.toLocaleString()}</p>
                        </div>
                      )
                    }
                    return null
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="amount"
                  stroke="#327039"
                  strokeWidth={3}
                  dot={{ fill: "#327039", strokeWidth: 2, r: 6 }}
                  activeDot={{ r: 8, fill: "#327039" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
