"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { User } from "lucide-react"
import { StellarWalletsKit } from '@creit.tech/stellar-wallets-kit';


interface WalletConnectionProps {
  onConnect: (address: string) => void
  onDisconnect: () => void
  isConnected: boolean
  address?: string
}

export function WalletConnection({ onConnect, onDisconnect, isConnected, address }: WalletConnectionProps) {
  const [isConnecting, setIsConnecting] = useState(false)
  //const kit = new WalletsKit({ network: Network.TESTNET })

  const handleConnect = async () => {
    try {
      setIsConnecting(true)
      const { address } = await kit.getAddress()
      onConnect(address)
    } catch (error) {
      console.error("Error al conectar la wallet:", error)
    } finally {
      setIsConnecting(false)
    }
  }

  if (isConnected && address) {
    return (
      <div className="flex items-center space-x-3">
        <Link href="/perfil">
          <Button
            variant="outline"
            size="sm"
            className="bg-white text-trace-forest border-trace-forest hover:bg-gray-100 hover:text-trace-forest"
          >
            <User className="h-4 w-4 mr-2" />
            Mi Perfil
          </Button>
        </Link>
        <Button
          variant="outline"
          size="sm"
          className="bg-white text-trace-forest border-trace-forest hover:bg-gray-100 hover:text-trace-forest"
          onClick={onDisconnect}
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
      className="bg-trace-wallet hover:bg-trace-wallet-dark text-white font-medium px-6 py-2.5 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
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