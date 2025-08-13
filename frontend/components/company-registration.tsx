"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Clock, Building2 } from "lucide-react"

export function CompanyRegistration() {
  const [step, setStep] = useState<"form" | "submitted" | "approved">("form")
  const [formData, setFormData] = useState({
    companyName: "",
    cuit: "",
    industry: "",
    contactName: "",
    email: "",
    phone: "",
    website: "",
    description: "",
    donationGoal: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStep("submitted")

    // Simulate approval process
    setTimeout(() => {
      setStep("approved")
    }, 3000)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  if (step === "submitted") {
    return (
      <Card className="w-full max-w-sm mx-auto">
        <CardHeader className="text-center pb-4">
          <div className="mx-auto w-12 h-12 bg-trace-wheat/20 rounded-full flex items-center justify-center mb-3">
            <Clock className="w-6 h-6 text-trace-wheat" />
          </div>
          <CardTitle className="text-trace-earth text-lg">Solicitud Enviada</CardTitle>
          <CardDescription className="text-sm">Tu solicitud está siendo revisada por nuestro equipo.</CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          <Badge variant="secondary" className="w-full justify-center py-2 bg-trace-wheat/10 text-trace-earth">
            Estado: En revisión
          </Badge>
        </CardContent>
      </Card>
    )
  }

  if (step === "approved") {
    return (
      <Card className="w-full max-w-sm mx-auto">
        <CardHeader className="text-center pb-4">
          <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-3">
            <CheckCircle className="w-6 h-6 text-green-600" />
          </div>
          <CardTitle className="text-trace-earth text-lg">¡Aprobado!</CardTitle>
          <CardDescription className="text-sm">Tu cuenta empresarial ha sido aprobada.</CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          <Button className="w-full bg-trace-forest hover:bg-trace-earth">Acceder al Dashboard</Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader className="pb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-trace-forest/10 rounded-lg flex items-center justify-center">
            <Building2 className="w-5 h-5 text-trace-forest" />
          </div>
          <div>
            <CardTitle className="text-trace-earth text-lg">Registro Empresarial</CardTitle>
            <CardDescription className="text-sm">Completa el formulario para solicitar acceso</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label htmlFor="companyName" className="text-sm">
                Razón Social *
              </Label>
              <Input
                id="companyName"
                value={formData.companyName}
                onChange={(e) => handleInputChange("companyName", e.target.value)}
                placeholder="Empresa SA"
                className="h-9"
                required
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="cuit" className="text-sm">
                CUIT *
              </Label>
              <Input
                id="cuit"
                value={formData.cuit}
                onChange={(e) => handleInputChange("cuit", e.target.value)}
                placeholder="XX-XXXXXXXX-X"
                className="h-9"
                required
              />
            </div>
          </div>

          <div className="space-y-1">
            <Label htmlFor="industry" className="text-sm">
              Industria *
            </Label>
            <Select onValueChange={(value) => handleInputChange("industry", value)}>
              <SelectTrigger className="h-9">
                <SelectValue placeholder="Selecciona tu industria" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="tecnologia">Tecnología</SelectItem>
                <SelectItem value="finanzas">Finanzas</SelectItem>
                <SelectItem value="salud">Salud</SelectItem>
                <SelectItem value="educacion">Educación</SelectItem>
                <SelectItem value="manufactura">Manufactura</SelectItem>
                <SelectItem value="retail">Retail</SelectItem>
                <SelectItem value="otros">Otros</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label htmlFor="contactName" className="text-sm">
                Contacto *
              </Label>
              <Input
                id="contactName"
                value={formData.contactName}
                onChange={(e) => handleInputChange("contactName", e.target.value)}
                placeholder="Juan Pérez"
                className="h-9"
                required
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="email" className="text-sm">
                Email *
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="contacto@empresa.com"
                className="h-9"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label htmlFor="phone" className="text-sm">
                Teléfono
              </Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                placeholder="+54 11 XXXX-XXXX"
                className="h-9"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="donationGoal" className="text-sm">
                Meta Anual (USD)
              </Label>
              <Input
                id="donationGoal"
                type="number"
                value={formData.donationGoal}
                onChange={(e) => handleInputChange("donationGoal", e.target.value)}
                placeholder="50000"
                className="h-9"
              />
            </div>
          </div>

          <div className="space-y-1">
            <Label htmlFor="website" className="text-sm">
              Sitio Web
            </Label>
            <Input
              id="website"
              value={formData.website}
              onChange={(e) => handleInputChange("website", e.target.value)}
              placeholder="https://empresa.com"
              className="h-9"
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="description" className="text-sm">
              Descripción
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="Describe brevemente tu empresa..."
              rows={2}
              className="resize-none"
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-trace-forest to-trace-earth hover:from-trace-earth hover:to-trace-forest text-white font-medium py-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Enviar Solicitud
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
