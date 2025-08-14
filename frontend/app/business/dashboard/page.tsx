import { Header } from "@/components/header"
import { DashboardStats } from "@/components/dashboard-stats"
import { ImpactMetrics } from "@/components/impact-metrics"
import { DonationHistory } from "@/components/donation-history"
import { ProjectsMap } from "@/components/projects-map"
import { TaxDeductionCard } from "@/components/tax-deduction-card"
import { DownloadReports } from "@/components/download-reports"
import { mockCompanyStats, mockCompanyDonations, mockProjects } from "@/lib/mock-data"

export default function CompanyDashboard() {
  // Filter projects that the company has donated to
  const supportedProjects = mockProjects.filter((project) =>
    mockCompanyDonations.some((donation) => donation.projectId === project.id),
  )

  return (
    <div className="min-h-screen bg-trace-alabaster">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-trace-earth mb-2">Dashboard Empresarial</h1>
          <p className="text-trace-earth/70">
            Monitorea tu impacto social y gestiona tus donaciones de forma transparente
          </p>
        </div>

        {/* Stats Overview */}
        <DashboardStats stats={mockCompanyStats} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <ImpactMetrics stats={mockCompanyStats} />
            <ProjectsMap projects={supportedProjects} />
            <DonationHistory donations={mockCompanyDonations} projects={mockProjects} />
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <TaxDeductionCard stats={mockCompanyStats} />
            <DownloadReports />
          </div>
        </div>
      </main>
    </div>
  )
}
