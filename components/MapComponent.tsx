"use client"

import { useEffect, useRef } from "react"
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet"
import "leaflet/dist/leaflet.css"
import L from "leaflet"

// Tipos dos props
interface MarkerData {
  id?: string
  lat: number
  lng: number
  name: string
}

interface MapComponentProps {
  markers: MarkerData[]
  onMarkerClick: (index: number) => void
  onMapClick: (lat: number, lng: number) => void
  selectedMarkerIndex: number | null
}

const customIcon = new L.Icon({
  iconUrl: "/icons/admin/map-pinned.svg",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: "/icons/marker-shadow.png",
})

const MapComponent: React.FC<MapComponentProps> = ({
  markers,
  onMarkerClick,
  onMapClick,
  selectedMarkerIndex,
}) => {
  const mapRef = useRef<L.Map | null>(null) // 🔹 Guarda a referência do mapa

  useEffect(() => {
    if (mapRef.current && selectedMarkerIndex !== null) {
      const marker = markers[selectedMarkerIndex]
      mapRef.current.setView([marker.lat, marker.lng], 14) // 🔹 Centraliza no marcador selecionado
    }
  }, [selectedMarkerIndex, markers])

  return (
    <MapContainer
      center={[-29.5156, -50.7782]}
      zoom={13}
      scrollWheelZoom={true}
      className="h-[500px] w-full rounded-md z-10"
      whenReady={(mapInstance: { target: L.Map | null }) => {
        mapRef.current = mapInstance.target // 🔹 Captura a instância corretamente
      }}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapClickHandler onMapClick={onMapClick} />
      {markers.map((marker, index) => (
        <Marker
          key={index}
          position={[marker.lat, marker.lng]}
          icon={customIcon}
          eventHandlers={{
            click: () => onMarkerClick(index),
          }}
        >
          <Popup>{marker.name || `Ponto ${index + 1}`}</Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}

// 🔹 Componente interno para capturar cliques no mapa
interface MapClickHandlerProps {
  onMapClick: (lat: number, lng: number) => void
}

const MapClickHandler: React.FC<MapClickHandlerProps> = ({ onMapClick }) => {
  useMapEvents({
    click(e) {
      onMapClick(e.latlng.lat, e.latlng.lng)
    },
  })
  return null
}

export default MapComponent
