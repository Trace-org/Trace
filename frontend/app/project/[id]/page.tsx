import { notFound } from "next/navigation"
import { Header } from "@/components/header"
import { ProjectHero } from "@/components/project-hero"
import { ProjectDetails } from "@/components/project-details"
import { ProjectMilestones } from "@/components/project-milestones"
import { ProjectUpdates } from "@/components/project-updates"
import { DonationCard } from "@/components/donation-card"
import { mockProjects } from "@/lib/mock-data"

interface ProjectPageProps {
  params: {
    id: string
  }
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const project = mockProjects.find((p) => p.id === params.id)

  if (!project) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-trace-alabaster">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ProjectHero project={project} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <ProjectDetails project={project} />
            <ProjectMilestones project={project} />
            <ProjectUpdates project={project} />
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <DonationCard project={project} />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
