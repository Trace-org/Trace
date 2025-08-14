import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Provider } from "@/hooks/Provider" 

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "Trace - Crowdfunding Transparente",
  description: "Plataforma de crowdfunding con transparencia total y trazabilidad completa de cada donación",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={`${inter.variable}`}>
      <body className="font-sans antialiased">
        <Provider> 
          {children}
        </Provider>
      </body>
    </html>
  )
}
