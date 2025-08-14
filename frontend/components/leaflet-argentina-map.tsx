"use client"

import { useEffect, useRef, useState } from "react"
import L from "leaflet"
import { Layers } from "lucide-react"
import type { Project } from "@/lib/mock-data"
import { formatCurrency } from "@/lib/utils"

// Fix para iconos por defecto de Leaflet en bundlers
// @ts-ignore
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
})

interface LeafletArgentinaMapProps {
  projects: Project[]
  height?: string
}

export function LeafletArgentinaMap({ projects, height = "320px" }: LeafletArgentinaMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<L.Map | null>(null)
  const [currentLayer, setCurrentLayer] = useState<"satellite" | "osm">("osm")
  const markersRef = useRef<L.Marker[]>([])

  const createMarker = () =>
    L.divIcon({
      html: '<div style="background:#327039;width:14px;height:14px;border-radius:50%;border:2px solid white;box-shadow:0 1px 6px rgba(0,0,0,.25);"></div>',
      className: "custom-marker",
      iconSize: [18, 18],
      iconAnchor: [9, 9],
    })

  const initMap = () => {
    if (!mapRef.current || mapInstanceRef.current) return

    // Centro aproximado de Argentina
    const map = L.map(mapRef.current).setView([-38.4161, -63.6167], 4)

    const satelliteLayer = L.tileLayer(
      "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
      { attribution: "Tiles © Esri" }
    )
    const osmLayer = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
    })

    osmLayer.addTo(map)
    ;(map as any).satelliteLayer = satelliteLayer
    ;(map as any).osmLayer = osmLayer

    mapInstanceRef.current = map
    addMarkers()
  }

  const addMarkers = () => {
    if (!mapInstanceRef.current) return

    // Limpiar marcadores anteriores
    markersRef.current.forEach((m) => mapInstanceRef.current?.removeLayer(m))
    markersRef.current = []

    const icon = createMarker()
    projects.forEach((p) => {
      const [lng, lat] = p.location.coordinates
      const marker = L.marker([lat, lng], { icon })
        .addTo(mapInstanceRef.current!)
        .on("click", () => {
          const content = `
            <div style="min-width:240px">
              <div style="font-weight:600;color:#1f2a1f;margin-bottom:4px">${p.name}</div>
              <div style="color:#3f3f46;font-size:12px;margin-bottom:6px">${p.location.city}, ${p.location.province}</div>
              <div style="display:flex;justify-content:space-between;align-items:center;font-size:12px;margin-bottom:6px">
                <span style="font-weight:600;color:#1f2a1f">${formatCurrency(p.currentAmount)}</span>
                <span style="color:#6b7280">de ${formatCurrency(p.targetAmount)}</span>
              </div>
              <div style="display:flex;justify-content:flex-end">
                <a href="/proyecto/${p.id}" style="color:#327039;text-decoration:none;font-weight:600;font-size:12px">Ver proyecto →</a>
              </div>
            </div>`
          marker.bindPopup(content, { closeButton: true }).openPopup()
        })
      markersRef.current.push(marker)
    })
  }

  const switchLayer = () => {
    if (!mapInstanceRef.current) return
    if (currentLayer === "satellite") {
      mapInstanceRef.current.removeLayer((mapInstanceRef.current as any).satelliteLayer)
      ;(mapInstanceRef.current as any).osmLayer.addTo(mapInstanceRef.current)
      setCurrentLayer("osm")
    } else {
      mapInstanceRef.current.removeLayer((mapInstanceRef.current as any).osmLayer)
      ;(mapInstanceRef.current as any).satelliteLayer.addTo(mapInstanceRef.current)
      setCurrentLayer("satellite")
    }
  }

  useEffect(() => {
    initMap()
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    addMarkers()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projects])

  return (
    <div className="relative rounded-lg overflow-hidden border border-trace-forest/20 bg-gradient-to-br from-gray-100 to-gray-200" style={{ height }}>
      <div ref={mapRef} className="w-full h-full" />
      <button
        onClick={switchLayer}
        className="absolute top-3 left-3 bg-white p-2 rounded-md shadow hover:shadow-md transition-shadow z-[1000] flex items-center gap-2 text-xs"
      >
        <Layers className="w-4 h-4" /> {currentLayer === "satellite" ? "Satélite" : "Mapa"}
      </button>
    </div>
  )
}

export default LeafletArgentinaMap
