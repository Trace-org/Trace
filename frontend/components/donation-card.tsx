"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Heart,
  Shield,
  Zap,
  MapPin,
  CreditCard,
  Wallet,
  Building2,
  CheckCircle,
  ArrowLeft,
  Loader2,
} from "lucide-react"
import type { Project } from "@/lib/mock-data"

interface DonationCardProps {
  project: Project
}

type DonationStep = "amount" | "payment" | "confirmation" | "processing" | "success"
type PaymentMethod = "wallet" | "card" | "bank"

const suggestedAmounts = [1000, 2500, 5000, 10000]

export function DonationCard({ project }: DonationCardProps) {
  const [donationAmount, setDonationAmount] = useState<number | string>("")
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null)
  const [currentStep, setCurrentStep] = useState<DonationStep>("amount")
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | null>(null)
  const [transactionId, setTransactionId] = useState<string>("")

  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount)
    setDonationAmount(amount)
  }

  const handleCustomAmount = (value: string) => {
    setSelectedAmount(null)
    setDonationAmount(value)
  }

  const proceedToPayment = () => {
    if (donationAmount && Number(donationAmount) > 0) {
      setCurrentStep("payment")
    }
  }

  const selectPaymentMethod = (method: PaymentMethod) => {
    setPaymentMethod(method)
    setCurrentStep("confirmation")
  }

  const confirmDonation = () => {
    setCurrentStep("processing")
    setTimeout(() => {
      const txId = `TX${Date.now().toString().slice(-8)}`
      setTransactionId(txId)
      setCurrentStep("success")
    }, 2000)
  }

  const resetDonation = () => {
    setCurrentStep("amount")
    setPaymentMethod(null)
    setTransactionId("")
    setDonationAmount("")
    setSelectedAmount(null)
  }

  const goBack = () => {
    if (currentStep === "payment") setCurrentStep("amount")
    if (currentStep === "confirmation") setCurrentStep("payment")
  }

  if (currentStep === "amount") {
    return (
      <div className="space-y-6">
        <Card className="border-trace-forest/20">
          <CardHeader className="bg-trace-forest/5">
            <CardTitle className="font-serif text-xl text-trace-earth flex items-center">
              <Heart className="w-5 h-5 mr-2 text-trace-cherry" />
              Hacer una donación
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div>
              <label className="text-sm font-medium text-trace-earth mb-3 block">Montos sugeridos</label>
              <div className="grid grid-cols-2 gap-2">
                {suggestedAmounts.map((amount) => (
                  <Button
                    key={amount}
                    variant={selectedAmount === amount ? "default" : "outline"}
                    className={
                      selectedAmount === amount
                        ? "bg-trace-forest text-white"
                        : "border-trace-forest/30 text-trace-forest hover:bg-trace-forest hover:text-white"
                    }
                    onClick={() => handleAmountSelect(amount)}
                  >
                    ${amount.toLocaleString()}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-trace-earth mb-2 block">O ingresa tu monto</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-trace-earth/70">$</span>
                <Input
                  type="number"
                  placeholder="0"
                  value={donationAmount}
                  onChange={(e) => handleCustomAmount(e.target.value)}
                  className="pl-8 border-trace-forest/20 focus:border-trace-forest"
                />
              </div>
            </div>

            <Button
              className="w-full bg-trace-forest hover:bg-trace-earth text-white py-3"
              disabled={!donationAmount || Number(donationAmount) <= 0}
              onClick={proceedToPayment}
            >
              <Heart className="w-4 h-4 mr-2" />
              Continuar con ${Number(donationAmount).toLocaleString() || "0"}
            </Button>

            <div className="space-y-2 pt-4 border-t border-gray-100">
              <div className="flex items-center text-sm text-trace-earth/70">
                <Shield className="w-4 h-4 mr-2 text-trace-forest" />
                Transacción segura y trazable
              </div>
              <div className="flex items-center text-sm text-trace-earth/70">
                <Zap className="w-4 h-4 mr-2 text-trace-wheat" />
                Comisiones bajas garantizadas
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Project Info Card */}
        <Card>
          <CardHeader>
            <CardTitle className="font-serif text-lg text-trace-earth">Información del proyecto</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-trace-earth/70">Organización</span>
                <span className="text-sm font-medium text-trace-earth">{project.organizationName}</span>
              </div>
              <div className="flex justify-end mt-1">
                <Badge variant="outline" className="border-trace-forest/30 text-trace-forest text-xs">
                  Verificada
                </Badge>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-trace-earth/70">Ubicación</span>
              <div className="flex items-center text-sm text-trace-earth">
                <MapPin className="w-3 h-3 mr-1" />
                {project.location.city}, {project.location.province}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-trace-earth/70">Categoría</span>
              <Badge variant="outline" className="border-trace-forest/30 text-trace-forest">
                {project.category}
              </Badge>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-trace-earth/70">Fecha límite</span>
              <span className="text-sm text-trace-earth">{new Date(project.deadline).toLocaleDateString("es-AR")}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (currentStep === "payment") {
    return (
      <Card className="border-trace-forest/20">
        <CardHeader className="bg-trace-forest/5">
          <CardTitle className="font-serif text-xl text-trace-earth flex items-center">
            <Button variant="ghost" size="sm" onClick={goBack} className="mr-2 p-1">
              <ArrowLeft className="w-4 h-4" />
            </Button>
            Método de pago
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          <div className="bg-trace-alabaster/50 p-4 rounded-lg">
            <div className="text-sm text-trace-earth/70">Monto a donar</div>
            <div className="text-2xl font-bold text-trace-earth">${Number(donationAmount).toLocaleString()}</div>
          </div>

          <div className="space-y-3">
            <Button
              variant="outline"
              className="w-full justify-start p-4 h-auto border-trace-forest/20 hover:bg-trace-forest hover:text-white bg-transparent"
              onClick={() => selectPaymentMethod("wallet")}
            >
              <Wallet className="w-5 h-5 mr-3" />
              <div className="text-left">
                <div className="font-medium">Billetera Digital</div>
                <div className="text-sm opacity-70">Conecta tu billetera crypto</div>
              </div>
            </Button>

            <Button
              variant="outline"
              className="w-full justify-start p-4 h-auto border-trace-forest/20 hover:bg-trace-forest hover:text-white bg-transparent"
              onClick={() => selectPaymentMethod("card")}
            >
              <CreditCard className="w-5 h-5 mr-3" />
              <div className="text-left">
                <div className="font-medium">Tarjeta de Crédito/Débito</div>
                <div className="text-sm opacity-70">Visa, Mastercard, American Express</div>
              </div>
            </Button>

            <Button
              variant="outline"
              className="w-full justify-start p-4 h-auto border-trace-forest/20 hover:bg-trace-forest hover:text-white bg-transparent"
              onClick={() => selectPaymentMethod("bank")}
            >
              <Building2 className="w-5 h-5 mr-3" />
              <div className="text-left">
                <div className="font-medium">Transferencia Bancaria</div>
                <div className="text-sm opacity-70">Desde tu cuenta bancaria</div>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (currentStep === "confirmation") {
    const getPaymentMethodName = () => {
      switch (paymentMethod) {
        case "wallet":
          return "Billetera Digital"
        case "card":
          return "Tarjeta de Crédito"
        case "bank":
          return "Transferencia Bancaria"
        default:
          return ""
      }
    }

    return (
      <Card className="border-trace-forest/20">
        <CardHeader className="bg-trace-forest/5">
          <CardTitle className="font-serif text-xl text-trace-earth flex items-center">
            <Button variant="ghost" size="sm" onClick={goBack} className="mr-2 p-1">
              <ArrowLeft className="w-4 h-4" />
            </Button>
            Confirmar donación
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div className="bg-trace-alabaster/50 p-4 rounded-lg space-y-3">
            <div className="flex justify-between">
              <span className="text-trace-earth/70">Proyecto</span>
              <span className="font-medium text-trace-earth">{project.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-trace-earth/70">Monto</span>
              <span className="font-bold text-trace-earth">${Number(donationAmount).toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-trace-earth/70">Método de pago</span>
              <span className="font-medium text-trace-earth">{getPaymentMethodName()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-trace-earth/70">Comisión</span>
              <span className="font-medium text-trace-forest">$0 (Sin comisiones)</span>
            </div>
            <div className="border-t pt-3 flex justify-between">
              <span className="font-bold text-trace-earth">Total</span>
              <span className="font-bold text-trace-earth">${Number(donationAmount).toLocaleString()}</span>
            </div>
          </div>

          <div className="space-y-2 text-sm text-trace-earth/70">
            <div className="flex items-center">
              <Shield className="w-4 h-4 mr-2 text-trace-forest" />
              Tu donación será procesada de forma segura
            </div>
            <div className="flex items-center">
              <Zap className="w-4 h-4 mr-2 text-trace-wheat" />
              Recibirás confirmación por email
            </div>
          </div>

          <Button className="w-full bg-trace-forest hover:bg-trace-earth text-white py-3" onClick={confirmDonation}>
            <Heart className="w-4 h-4 mr-2" />
            Confirmar donación de ${Number(donationAmount).toLocaleString()}
          </Button>
        </CardContent>
      </Card>
    )
  }

  if (currentStep === "processing") {
    return (
      <Card className="border-trace-forest/20">
        <CardContent className="p-8 text-center space-y-6">
          <Loader2 className="w-12 h-12 animate-spin text-trace-forest mx-auto" />
          <div>
            <h3 className="font-serif text-xl text-trace-earth mb-2">Procesando tu donación</h3>
            <p className="text-trace-earth/70">Por favor espera mientras confirmamos tu transacción...</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (currentStep === "success") {
    return (
      <Card className="border-trace-forest/20">
        <CardContent className="p-8 text-center space-y-6">
          <CheckCircle className="w-16 h-16 text-trace-forest mx-auto" />
          <div>
            <h3 className="font-serif text-2xl text-trace-earth mb-2">¡Donación exitosa!</h3>
            <p className="text-trace-earth/70 mb-4">
              Tu contribución de ${Number(donationAmount).toLocaleString()} ha sido procesada correctamente.
            </p>

            <div className="bg-trace-alabaster/50 p-4 rounded-lg space-y-2">
              <div className="text-sm text-trace-earth/70">ID de transacción</div>
              <div className="font-mono text-trace-earth font-medium">{transactionId}</div>
            </div>
          </div>

          <div className="space-y-2 text-sm text-trace-earth/70">
            <div className="flex items-center justify-center">
              <Shield className="w-4 h-4 mr-2 text-trace-forest" />
              Tu donación es completamente trazable
            </div>
            <div className="flex items-center justify-center">
              <Heart className="w-4 h-4 mr-2 text-trace-cherry" />
              Recibirás actualizaciones del proyecto por email
            </div>
          </div>

          <Button
            variant="outline"
            className="border-trace-forest/30 text-trace-forest hover:bg-trace-forest hover:text-white bg-transparent"
            onClick={resetDonation}
          >
            Hacer otra donación
          </Button>
        </CardContent>
      </Card>
    )
  }

  return null
}
