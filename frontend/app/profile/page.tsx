"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { UserDashboard } from "@/components/user-dashboard"
import { CompanyDashboard } from "@/components/company-dashboard"
import { Building2, User } from "lucide-react"
import { mockCompanyStats } from "@/lib/mock-data"

export default function ProfilePage() {
  const [dashboardType, setDashboardType] = useState<"user" | "company">("user")

  return (
    <div className="min-h-screen bg-gradient-to-br from-trace-alabaster to-white">
      <div className="container mx-auto px-4 py-8">
        {/* Dashboard Type Toggle */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg p-1 shadow-sm border border-trace-forest/10">
            <Button
              variant={dashboardType === "user" ? "default" : "ghost"}
              size="sm"
              onClick={() => setDashboardType("user")}
              className={`${
                dashboardType === "user" ? "bg-trace-forest text-white hover:bg-white hover:text-black" : "text-trace-earth hover:bg-trace-alabaster"
              }`}
            >
              <User className="h-4 w-4 mr-2" />
              Usuario
            </Button>
            <Button
              variant={dashboardType === "company" ? "default" : "ghost"}
              size="sm"
              onClick={() => setDashboardType("company")}
              className={`${
                dashboardType === "company" ? "bg-trace-forest text-white hover:bg-white hover:text-black" : "text-trace-earth hover:bg-trace-alabaster"
              }`}
            >
              <Building2 className="h-4 w-4 mr-2" />
              Empresa
            </Button>
          </div>
        </div>

        {/* Dashboard Content */}
        {dashboardType === "user" ? <UserDashboard /> : <CompanyDashboard stats={mockCompanyStats} />}
      </div>
    </div>
  )
}
