"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { WalletConnection } from "./wallet-connection"
import { CompanyRegistration } from "./company-registration"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Building2, Menu, X } from "lucide-react"

export function Header() {
  const [isWalletConnected, setIsWalletConnected] = useState(false)
  const [walletAddress, setWalletAddress] = useState<string>()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleWalletConnect = (address: string) => {
    setIsWalletConnected(true)
    setWalletAddress(address)
  }

  const handleWalletDisconnect = () => {
    setIsWalletConnected(false)
    setWalletAddress(undefined)
  }

  return (
    <header className="bg-white/95 backdrop-blur-md border-b border-trace-forest/10 sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center group">
              <Image
                src="/trace-wordmark.png"
                alt="Trace"
                width={100}
                height={34}
                className="h-8 w-auto transition-all duration-300 group-hover:scale-105"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link
              href="/"
              className="text-trace-earth font-semibold hover:text-trace-forest transition-all duration-300 relative group py-3 px-4 rounded-lg hover:bg-trace-forest/5"
            >
              Proyectos
              <span className="absolute bottom-1 left-4 w-0 h-0.5 bg-gradient-to-r from-trace-forest to-trace-earth transition-all duration-300 group-hover:w-8"></span>
            </Link>
            <Link
              href="/como-funciona"
              className="text-trace-earth font-semibold hover:text-trace-forest transition-all duration-300 relative group py-3 px-4 rounded-lg hover:bg-trace-forest/5"
            >
              Cómo funciona
              <span className="absolute bottom-1 left-4 w-0 h-0.5 bg-gradient-to-r from-trace-forest to-trace-earth transition-all duration-300 group-hover:w-8"></span>
            </Link>
            <Dialog>
              <DialogTrigger asChild>
                <button className="text-trace-earth font-semibold hover:text-trace-forest transition-all duration-300 relative group py-3 px-4 rounded-lg hover:bg-trace-forest/5 flex items-center space-x-2">
                  <Building2 className="w-4 h-4" />
                  <span>Para empresas</span>
                  <span className="absolute bottom-1 left-4 w-0 h-0.5 bg-gradient-to-r from-trace-forest to-trace-earth transition-all duration-300 group-hover:w-8"></span>
                </button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <CompanyRegistration DialogCloseButton={DialogClose} />
              </DialogContent>
            </Dialog>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            <WalletConnection
              onConnect={handleWalletConnect}
              onDisconnect={handleWalletDisconnect}
              isConnected={isWalletConnected}
              address={walletAddress}
            />
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-trace-earth hover:bg-trace-forest/10 p-2"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-trace-forest/10 py-4 space-y-4">
            <Link
              href="/"
              className="block text-trace-earth font-semibold hover:text-trace-forest transition-colors py-2 px-4 rounded-lg hover:bg-trace-forest/5"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Proyectos
            </Link>
            <Link
              href="/como-funciona"
              className="block text-trace-earth font-semibold hover:text-trace-forest transition-colors py-2 px-4 rounded-lg hover:bg-trace-forest/5"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Cómo funciona
            </Link>
            <Dialog>
              <DialogTrigger asChild>
                <button className="flex items-center space-x-2 text-trace-earth font-semibold hover:text-trace-forest transition-colors py-2 px-4 rounded-lg hover:bg-trace-forest/5 w-full text-left">
                  <Building2 className="w-4 h-4" />
                  <span>Para empresas</span>
                </button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <CompanyRegistration DialogCloseButton={DialogClose} />
              </DialogContent>
            </Dialog>
            <div className="pt-4 border-t border-trace-forest/10">
              <WalletConnection
                onConnect={handleWalletConnect}
                onDisconnect={handleWalletDisconnect}
                isConnected={isWalletConnected}
                address={walletAddress}
              />
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
