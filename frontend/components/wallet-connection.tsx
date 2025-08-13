"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { User } from "lucide-react"

interface WalletConnectionProps {
  onConnect: (address: string) => void
  onDisconnect: () => void
  isConnected: boolean
  address?: string
}

export function WalletConnection({ onConnect, onDisconnect, isConnected, address }: WalletConnectionProps) {
  const [isConnecting, setIsConnecting] = useState(false)

  const handleConnect = async () => {
    setIsConnecting(true)
    // Simulate wallet connection
    setTimeout(() => {
      const mockAddress = "0x742d35Cc6634C0532925a3b8D4C9db96590b5b8e"
      onConnect(mockAddress)
      setIsConnecting(false)
    }, 1500)
  }

  if (isConnected && address) {
    return (
      <div className="flex items-center space-x-3">
        <Badge variant="secondary" className="bg-trace-forest/10 text-trace-forest border-trace-forest/20">
          <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
          {address.slice(0, 6)}...{address.slice(-4)}
        </Badge>
        <Link href="/perfil">
          <Button
            variant="outline"
            size="sm"
            className="text-trace-forest border-trace-forest hover:bg-trace-forest hover:text-white bg-trace-alabaster"
          >
            <User className="h-4 w-4 mr-2" />
            Mi Perfil
          </Button>
        </Link>
        <Button
          variant="outline"
          size="sm"
          onClick={onDisconnect}
          className="text-trace-forest border-trace-forest hover:bg-trace-forest hover:text-white bg-trace-alabaster"
        >
          Desconectar
        </Button>
      </div>
    )
  }

  return (
    <Button
      onClick={handleConnect}
      disabled={isConnecting}
      className="bg-gradient-to-r from-trace-forest to-trace-earth hover:from-trace-earth hover:to-trace-forest text-white font-medium px-6 py-2.5 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
    >
      {isConnecting ? (
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
          <span>Conectando...</span>
        </div>
      ) : (
        "Conectar Wallet"
      )}
    </Button>
  )
}
