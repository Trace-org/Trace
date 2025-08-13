import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Receipt, Download, TrendingUp } from "lucide-react"
import type { CompanyStats } from "@/lib/mock-data"

interface TaxDeductionCardProps {
  stats: CompanyStats
}

export function TaxDeductionCard({ stats }: TaxDeductionCardProps) {
  // Mock tax year limits and calculations
  const maxDeductionLimit = 50000 // Example annual limit
  const deductionProgress = (stats.taxDeductions / maxDeductionLimit) * 100
  const remainingDeduction = maxDeductionLimit - stats.taxDeductions

  return (
    <Card className="border-trace-wheat/30 bg-trace-wheat/5">
      <CardHeader>
        <CardTitle className="font-serif text-xl text-trace-earth flex items-center">
          <Receipt className="w-5 h-5 mr-2 text-trace-wheat" />
          Deducción Fiscal 2025
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center">
          <div className="text-3xl font-bold text-trace-wheat mb-2">${stats.taxDeductions.toLocaleString()}</div>
          <div className="text-trace-earth/70">deducción acumulada</div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-trace-earth/70">Progreso anual</span>
            <span className="font-medium text-trace-wheat">{deductionProgress.toFixed(1)}%</span>
          </div>
          <Progress value={deductionProgress} className="h-2" />
          <div className="text-xs text-trace-earth/60 text-center">
            Límite anual: ${maxDeductionLimit.toLocaleString()}
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 border border-trace-wheat/30">
          <div className="flex items-center mb-2">
            <TrendingUp className="w-4 h-4 text-trace-forest mr-2" />
            <span className="font-semibold text-trace-earth">Oportunidad restante</span>
          </div>
          <p className="text-sm text-trace-earth/80 mb-3">
            Puedes deducir ${remainingDeduction.toLocaleString()} adicionales este año fiscal.
          </p>
          <Button
            variant="outline"
            className="w-full border-trace-forest/30 text-trace-forest hover:bg-trace-forest hover:text-white bg-transparent"
          >
            Ver proyectos recomendados
          </Button>
        </div>

        <Button className="w-full bg-trace-wheat text-trace-earth hover:bg-trace-wheat/80">
          <Download className="w-4 h-4 mr-2" />
          Descargar certificado fiscal
        </Button>
      </CardContent>
    </Card>
  )
}
