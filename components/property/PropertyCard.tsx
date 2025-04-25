import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"

import { Pencil, Eye, Trash2 } from "lucide-react"

type PropertyCardProps = {
  imageUrl: string
  name: string
  city: string
}

const PropertyCard = ({ imageUrl, name, city }: PropertyCardProps) => {
  return (
    <Card
      className="relative border-none flex min-h-[152px] w-full justify-between items-center bg-no-repeat bg-cover"
      style={{ backgroundImage: `url(${imageUrl})` }}
    >
      {/* Overlay para escurecer a imagem */}
      <div className="absolute inset-0 bg-black opacity-30 rounded-xl" />

      <CardHeader className="relative flex mt-auto space-y-0 p-5 text-white">
        <CardDescription className="text-xl text-white">{city}</CardDescription>
        <CardTitle className="text-2xl font-semibold">{name}</CardTitle>
      </CardHeader>
      <CardContent className="relative mt-auto items-center">
        <div className="flex gap-2">
          <button className="bg-white text-[#525252] rounded-full p-2">
            <Eye size={20} strokeWidth={1.5} />
          </button>
          <button className="bg-[#EFA350] rounded-full p-2 text-white">
            <Pencil size={20} strokeWidth={1.5} />
          </button>
          <button className="bg-red-400 rounded-full p-2 text-white">
            <Trash2 size={20} strokeWidth={1.5} />
          </button>
        </div>
      </CardContent>
    </Card>
  )
}

export default PropertyCard
