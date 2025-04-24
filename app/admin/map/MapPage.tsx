"use client"

import { useState } from "react"
import MapComponent from "@/components/MapComponent"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { CoordinateParams, Marker } from "@/types"
import { createCoordinate } from "@/lib/admin/actions/createMarker"
import { toast } from "@/hooks/use-toast"
import { companySchema, coordinatesSchema } from "@/lib/validations"
import { z } from "zod"
import { deleteCoordinate } from "@/lib/admin/actions/deleteMarker"
import { updateCoordinate } from "@/lib/admin/actions/updateMarker"

const MapPage = ({ initialMarkers }: { initialMarkers: any[] }) => {
  const [markers, setMarkers] = useState<Marker[]>(
    initialMarkers.map((marker) => ({
      id: marker.id,
      lat: parseFloat(marker.latitude),
      lng: parseFloat(marker.longitude),
      name: marker.name,
    }))
  )

  const [lat, setLat] = useState("")
  const [lng, setLng] = useState("")
  const [name, setName] = useState("")
  const [isPointModalOpen, setIsPointModalOpen] = useState(false)
  const [isListModalOpen, setIsListModalOpen] = useState(false)
  const [selectedMarkerIndex, setSelectedMarkerIndex] = useState<number | null>(
    null
  )

  const addOrEditMarker = async () => {
    if (!lat || !lng || !name) return

    if (selectedMarkerIndex !== null) {
      const updatedMarkers = [...markers]
      const markerToUpdate = updatedMarkers[selectedMarkerIndex]

      // Atualiza localmente
      markerToUpdate.name = name
      markerToUpdate.lat = parseFloat(lat)
      markerToUpdate.lng = parseFloat(lng)
      setMarkers(updatedMarkers)

      // Atualiza no banco se houver ID
      if (markerToUpdate.id) {
        const result = await updateCoordinate(markerToUpdate.id, {
          name,
          latitude: lat,
          longitude: lng,
        })

        if (result.success) {
          toast({
            title: "Sucesso",
            description: "Marcador atualizado com sucesso!",
          })
        } else {
          toast({
            title: "Erro ao atualizar marcador",
            description: result.message,
            variant: "destructive",
          })
        }
      }
    } else {
      const newMarker = {
        lat: parseFloat(lat),
        lng: parseFloat(lng),
        name,
      }
      setMarkers([...markers, newMarker])

      const validated = coordinatesSchema.safeParse({
        latitude: lat,
        longitude: lng,
        name,
      })

      if (!validated.success) {
        toast({
          title: "Erro",
          description: "Dados inválidos para criar marcador.",
          variant: "destructive",
        })
        return
      }

      const result = await createCoordinate(validated.data)

      if (result.success) {
        const lastIndex = markers.length
        const markerWithId = { ...newMarker, id: result.data.id }

        setMarkers([...markers.slice(0, lastIndex), markerWithId])

        toast({
          title: "Sucesso",
          description: "Marcador salvo com sucesso!",
        })
      } else {
        toast({
          title: "Erro ao salvar marcador",
          description: result.message,
          variant: "destructive",
        })
      }
    }

    // Limpa e fecha modal
    setIsPointModalOpen(false)
    setLat("")
    setLng("")
    setName("")
    setSelectedMarkerIndex(null)
  }

  const removeMarker = async () => {
    if (selectedMarkerIndex === null) return

    const markerToRemove = markers[selectedMarkerIndex]

    // Se tiver um ID, remove do banco
    if (markerToRemove.id) {
      const result = await deleteCoordinate(markerToRemove.id)
      if (!result.success) {
        toast({
          title: "Erro",
          description: result.message || "Erro ao remover do banco.",
          variant: "destructive",
        })
        return
      }
    }

    // Remove localmente
    setMarkers(markers.filter((_, index) => index !== selectedMarkerIndex))
    setIsPointModalOpen(false)
    setSelectedMarkerIndex(null)

    toast({
      title: "Removido",
      description: "Marcador removido com sucesso!",
    })
  }

  return (
    <div className="relative">
      {/* 🔹 Botão para abrir lista de marcadores */}
      <div className="absolute top-4 left-14 flex gap-2 z-50">
        <Button
          onClick={() => setIsListModalOpen(true)}
          className="bg-blue-500 text-white"
        >
          📍 Marcadores
        </Button>
      </div>

      {/* 🔹 Componente do Mapa */}
      <MapComponent
        markers={markers}
        onMarkerClick={(index) => {
          setLat(markers[index].lat.toString())
          setLng(markers[index].lng.toString())
          setName(markers[index].name) // 🔹 Pega o nome
          setSelectedMarkerIndex(index)
          setIsPointModalOpen(true)
        }}
        onMapClick={(lat, lng) => {
          setLat(lat.toString())
          setLng(lng.toString())
          setSelectedMarkerIndex(null)
          setIsPointModalOpen(true)
        }}
        selectedMarkerIndex={selectedMarkerIndex}
      />

      {/* 🔹 Modal para adicionar/editar pontos */}
      <Dialog open={isPointModalOpen} onOpenChange={setIsPointModalOpen}>
        <DialogContent className="z-[9999]">
          <DialogHeader>
            <DialogTitle>
              {selectedMarkerIndex !== null
                ? "Editar/Remover marcador"
                : "Adicionar novo ponto"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              type="text"
              placeholder="Latitude"
              value={lat}
              onChange={(e) => setLat(e.target.value)}
            />
            <Input
              type="text"
              placeholder="Longitude"
              value={lng}
              onChange={(e) => setLng(e.target.value)}
            />
            <Input
              type="text"
              required
              placeholder="Nome do ponto"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <DialogFooter>
            {selectedMarkerIndex !== null && (
              <Button
                onClick={removeMarker}
                className="bg-red-500 text-white mr-2"
              >
                Remover
              </Button>
            )}
            <Button
              onClick={addOrEditMarker}
              className="bg-primary-admin text-white"
            >
              {selectedMarkerIndex !== null ? "Salvar alterações" : "Salvar"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 🔹 Modal para listar e centralizar nos pontos */}
      <Dialog open={isListModalOpen} onOpenChange={setIsListModalOpen}>
        <DialogContent className="z-[9999]">
          <DialogHeader>
            <DialogTitle>Lista de Marcadores</DialogTitle>
          </DialogHeader>
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {markers.length === 0 ? (
              <p className="text-gray-500">Nenhum marcador adicionado</p>
            ) : (
              markers.map((marker, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-gray-100 p-2 rounded-md cursor-pointer hover:bg-gray-200"
                  onClick={() => {
                    setSelectedMarkerIndex(index)
                    setIsListModalOpen(false)
                  }}
                >
                  <span>
                    📍 {index + 1} -{" "}
                    {marker.name ||
                      `Lat: ${marker.lat.toFixed(4)}, Lng: ${marker.lng.toFixed(4)}`}
                  </span>
                </div>
              ))
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default MapPage
