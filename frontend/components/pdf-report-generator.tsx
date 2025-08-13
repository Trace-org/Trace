import { jsPDF } from "jspdf"

interface ReportData {
  companyName: string
  reportDate: string
  totalDonated: number
  projectsSupported: number
  peopleImpacted: number
  communitiesReached: number
  taxDeduction: number
  donations: Array<{
    date: string
    project: string
    amount: number
    transactionId: string
  }>
  projects: Array<{
    name: string
    location: string
    category: string
    donated: number
    impact: string
  }>
}

export class PDFReportGenerator {
  private static formatCurrency(amount: number): string {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
    }).format(amount)
  }

  private static formatDate(date: string): string {
    return new Date(date).toLocaleDateString("es-AR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  static async generateImpactReport(): Promise<void> {
    const pdf = new jsPDF("p", "mm", "a4")
    const pageWidth = pdf.internal.pageSize.getWidth()
    const pageHeight = pdf.internal.pageSize.getHeight()

    // Mock data - in real app this would come from the dashboard
    const reportData: ReportData = {
      companyName: "TechCorp Argentina",
      reportDate: new Date().toISOString(),
      totalDonated: 2450000,
      projectsSupported: 12,
      peopleImpacted: 3420,
      communitiesReached: 8,
      taxDeduction: 490000,
      donations: [
        { date: "2024-01-15", project: "Escuela Rural San Miguel", amount: 150000, transactionId: "TX001" },
        { date: "2024-02-20", project: "Centro Comunitario Esperanza", amount: 200000, transactionId: "TX002" },
        { date: "2024-03-10", project: "Biblioteca Popular Norte", amount: 180000, transactionId: "TX003" },
      ],
      projects: [
        {
          name: "Escuela Rural San Miguel",
          location: "Salta",
          category: "Educación",
          donated: 150000,
          impact: "240 estudiantes beneficiados",
        },
        {
          name: "Centro Comunitario Esperanza",
          location: "Córdoba",
          category: "Desarrollo Social",
          donated: 200000,
          impact: "500 familias atendidas",
        },
        {
          name: "Biblioteca Popular Norte",
          location: "Buenos Aires",
          category: "Educación",
          donated: 180000,
          impact: "1200 usuarios mensuales",
        },
      ],
    }

    // Header
    pdf.setFillColor(50, 112, 57) // trace-forest
    pdf.rect(0, 0, pageWidth, 25, "F")

    pdf.setTextColor(255, 255, 255)
    pdf.setFontSize(20)
    pdf.setFont("helvetica", "bold")
    pdf.text("REPORTE DE IMPACTO SOCIAL", pageWidth / 2, 15, { align: "center" })

    // Company info
    pdf.setTextColor(50, 112, 57)
    pdf.setFontSize(16)
    pdf.text(reportData.companyName, 20, 40)

    pdf.setTextColor(100, 100, 100)
    pdf.setFontSize(10)
    pdf.text(`Generado el ${this.formatDate(reportData.reportDate)}`, 20, 47)

    // Key metrics section
    let yPos = 65
    pdf.setTextColor(50, 112, 57)
    pdf.setFontSize(14)
    pdf.setFont("helvetica", "bold")
    pdf.text("MÉTRICAS CLAVE", 20, yPos)

    yPos += 15
    pdf.setTextColor(0, 0, 0)
    pdf.setFontSize(11)
    pdf.setFont("helvetica", "normal")

    const metrics = [
      ["Total Donado:", this.formatCurrency(reportData.totalDonated)],
      ["Proyectos Apoyados:", reportData.projectsSupported.toString()],
      ["Personas Impactadas:", reportData.peopleImpacted.toLocaleString("es-AR")],
      ["Comunidades Alcanzadas:", reportData.communitiesReached.toString()],
      ["Deducción Fiscal Estimada:", this.formatCurrency(reportData.taxDeduction)],
    ]

    metrics.forEach(([label, value]) => {
      pdf.text(label, 25, yPos)
      pdf.setFont("helvetica", "bold")
      pdf.text(value, 100, yPos)
      pdf.setFont("helvetica", "normal")
      yPos += 8
    })

    // Projects section
    yPos += 15
    pdf.setTextColor(50, 112, 57)
    pdf.setFontSize(14)
    pdf.setFont("helvetica", "bold")
    pdf.text("PROYECTOS APOYADOS", 20, yPos)

    yPos += 10
    reportData.projects.forEach((project) => {
      yPos += 10
      pdf.setTextColor(0, 0, 0)
      pdf.setFontSize(11)
      pdf.setFont("helvetica", "bold")
      pdf.text(project.name, 25, yPos)

      yPos += 6
      pdf.setFont("helvetica", "normal")
      pdf.setFontSize(9)
      pdf.text(`${project.location} • ${project.category}`, 25, yPos)

      yPos += 5
      pdf.text(`Donado: ${this.formatCurrency(project.donated)}`, 25, yPos)

      yPos += 5
      pdf.text(`Impacto: ${project.impact}`, 25, yPos)

      yPos += 8
    })

    // New page for donation history
    pdf.addPage()

    // Header for second page
    pdf.setFillColor(50, 112, 57)
    pdf.rect(0, 0, pageWidth, 25, "F")
    pdf.setTextColor(255, 255, 255)
    pdf.setFontSize(16)
    pdf.text("HISTORIAL DE DONACIONES", pageWidth / 2, 15, { align: "center" })

    yPos = 45
    pdf.setTextColor(50, 112, 57)
    pdf.setFontSize(14)
    pdf.setFont("helvetica", "bold")
    pdf.text("TRANSACCIONES RECIENTES", 20, yPos)

    yPos += 15
    reportData.donations.forEach((donation) => {
      pdf.setTextColor(0, 0, 0)
      pdf.setFontSize(10)
      pdf.setFont("helvetica", "bold")
      pdf.text(this.formatDate(donation.date), 25, yPos)

      pdf.setFont("helvetica", "normal")
      pdf.text(donation.project, 25, yPos + 5)
      pdf.text(this.formatCurrency(donation.amount), 25, yPos + 10)
      pdf.text(`ID: ${donation.transactionId}`, 25, yPos + 15)

      yPos += 25
    })

    // Footer
    const footerY = pageHeight - 20
    pdf.setTextColor(100, 100, 100)
    pdf.setFontSize(8)
    pdf.text("Generado por Trace - Plataforma de Crowdfunding Transparente", pageWidth / 2, footerY, {
      align: "center",
    })
    pdf.text("trace.com.ar", pageWidth / 2, footerY + 5, { align: "center" })

    // Save the PDF
    pdf.save(
      `reporte-impacto-${reportData.companyName.toLowerCase().replace(/\s+/g, "-")}-${new Date().getFullYear()}.pdf`,
    )
  }

  static async generateTaxCertificate(): Promise<void> {
    const pdf = new jsPDF("p", "mm", "a4")
    const pageWidth = pdf.internal.pageSize.getWidth()

    // Header
    pdf.setFillColor(50, 112, 57)
    pdf.rect(0, 0, pageWidth, 30, "F")

    pdf.setTextColor(255, 255, 255)
    pdf.setFontSize(18)
    pdf.setFont("helvetica", "bold")
    pdf.text("CERTIFICADO FISCAL", pageWidth / 2, 20, { align: "center" })

    // Content
    let yPos = 60
    pdf.setTextColor(0, 0, 0)
    pdf.setFontSize(12)
    pdf.text("CERTIFICADO DE DONACIONES PARA DEDUCCIÓN FISCAL", pageWidth / 2, yPos, { align: "center" })

    yPos += 20
    pdf.setFontSize(11)
    pdf.text("Se certifica que TechCorp Argentina ha realizado donaciones por un total de:", 20, yPos)

    yPos += 15
    pdf.setFontSize(16)
    pdf.setFont("helvetica", "bold")
    pdf.text("ARS $2.450.000", pageWidth / 2, yPos, { align: "center" })

    yPos += 20
    pdf.setFontSize(11)
    pdf.setFont("helvetica", "normal")
    pdf.text("Deducción fiscal estimada: ARS $490.000 (20% del total donado)", 20, yPos)

    yPos += 15
    pdf.text("Período: Enero 2024 - Diciembre 2024", 20, yPos)

    yPos += 30
    pdf.text("Este certificado es válido para presentar ante AFIP como comprobante", 20, yPos)
    pdf.text("de donaciones realizadas a organizaciones sin fines de lucro.", 20, yPos + 8)

    pdf.save("certificado-fiscal-trace-2024.pdf")
  }

  static async generateExecutiveReport(): Promise<void> {
    const pdf = new jsPDF("p", "mm", "a4")
    const pageWidth = pdf.internal.pageSize.getWidth()

    // Header
    pdf.setFillColor(50, 112, 57)
    pdf.rect(0, 0, pageWidth, 35, "F")

    pdf.setTextColor(255, 255, 255)
    pdf.setFontSize(20)
    pdf.setFont("helvetica", "bold")
    pdf.text("REPORTE EJECUTIVO", pageWidth / 2, 22, { align: "center" })

    // Executive summary
    let yPos = 60
    pdf.setTextColor(50, 112, 57)
    pdf.setFontSize(16)
    pdf.text("RESUMEN EJECUTIVO", 20, yPos)

    yPos += 15
    pdf.setTextColor(0, 0, 0)
    pdf.setFontSize(11)
    pdf.setFont("helvetica", "normal")

    const summary = [
      "Durante 2024, TechCorp Argentina ha demostrado un compromiso excepcional",
      "con la responsabilidad social corporativa a través de la plataforma Trace.",
      "",
      "Logros destacados:",
      "• Impacto directo en 3,420 personas",
      "• Apoyo a 12 proyectos de alto impacto social",
      "• Alcance en 8 comunidades diferentes",
      "• Beneficio fiscal de ARS $490,000",
      "",
      "La transparencia blockchain de Trace garantiza la trazabilidad completa",
      "de cada donación, fortaleciendo la confianza de stakeholders y beneficiarios.",
    ]

    summary.forEach((line) => {
      pdf.text(line, 20, yPos)
      yPos += 6
    })

    pdf.save("reporte-ejecutivo-trace-2024.pdf")
  }
}
