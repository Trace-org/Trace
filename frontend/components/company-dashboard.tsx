import { DashboardStats } from "@/components/dashboard-stats"
import { ImpactMetrics } from "@/components/impact-metrics"
import { DonationHistory } from "@/components/donation-history"
import { ProjectsMap } from "@/components/projects-map"
import { TaxDeductionCard } from "@/components/tax-deduction-card"
import { DownloadReports } from "@/components/download-reports"
import type { CompanyStats, Project, CompanyDonation } from "@/lib/mock-data" // Import CompanyStats, Project, CompanyDonation
import { mockProjects, mockCompanyDonations } from "@/lib/mock-data" // Import mock data

interface CompanyDashboardProps {
  stats: CompanyStats
}

export function CompanyDashboard({ stats }: CompanyDashboardProps) {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-trace-earth">Dashboard Empresarial</h1>
        <p className="text-trace-earth/70">Gestiona el impacto social de tu empresa</p>
      </div>

      <DashboardStats stats={stats} />
      <ImpactMetrics stats={stats} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <DonationHistory donations={mockCompanyDonations} projects={mockProjects} />
        <div className="space-y-6">
          <TaxDeductionCard stats={stats} />
          <DownloadReports />
        </div>
      </div>

      <ProjectsMap projects={mockProjects} />
    </div>
  )
}
