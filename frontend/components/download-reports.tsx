"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, FileText, BarChart3, Users } from "lucide-react"
import { PDFReportGenerator } from "@/components/pdf-report-generator"

const reports = [
  {
    title: "Reporte de Impacto",
    description: "Métricas completas de impacto social para stakeholders",
    icon: BarChart3,
    format: "PDF",
  },
  {
    title: "Certificado Fiscal",
    description: "Documentación oficial para deducción de impuestos",
    icon: FileText,
    format: "PDF",
  },
  {
    title: "Reporte Ejecutivo",
    description: "Resumen ejecutivo para presentaciones corporativas",
    icon: Users,
    format: "PDF + PPT",
  },
]

export function DownloadReports() {
  const handleDownload = async (reportType: string) => {
    try {
      switch (reportType) {
        case "impact":
          await PDFReportGenerator.generateImpactReport()
          break
        case "tax":
          await PDFReportGenerator.generateTaxCertificate()
          break
        case "executive":
          await PDFReportGenerator.generateExecutiveReport()
          break
        default:
          console.log("Tipo de reporte no reconocido")
      }
    } catch (error) {
      console.error("Error generando reporte:", error)
    }
  }

  const handleDownloadAll = async () => {
    try {
      await PDFReportGenerator.generateImpactReport()
      await PDFReportGenerator.generateTaxCertificate()
      await PDFReportGenerator.generateExecutiveReport()
    } catch (error) {
      console.error("Error generando reportes:", error)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl text-trace-earth">Reportes y Certificados</CardTitle>
        <p className="text-trace-earth/70">Documentación lista para stakeholders</p>
      </CardHeader>
      <CardContent className="space-y-4">
        {reports.map((report, index) => (
          <div
            key={index}
            className="flex items-start gap-3 p-3 bg-trace-alabaster rounded-lg border border-trace-forest/10"
          >
            <div className="p-2 bg-trace-forest/10 rounded-lg">
              <report.icon className="w-4 h-4 text-trace-forest" />
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-trace-earth">{report.title}</h4>
              <p className="text-sm text-trace-earth/70 mb-2">{report.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-trace-earth/60">{report.format}</span>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-trace-forest/30 text-trace-forest hover:bg-trace-forest hover:text-white bg-transparent"
                  onClick={() => handleDownload(index === 0 ? "impact" : index === 1 ? "tax" : "executive")}
                >
                  <Download className="w-3 h-3 mr-1" />
                  Descargar
                </Button>
              </div>
            </div>
          </div>
        ))}

        <div className="pt-4 border-t border-gray-100">
          <Button className="w-full bg-trace-forest text-white hover:bg-trace-earth" onClick={handleDownloadAll}>
            <Download className="w-4 h-4 mr-2" />
            Descargar todos los reportes
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
