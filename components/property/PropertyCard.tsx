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
      className="border-none flex min-h-[152px] w-full justify-between items-center bg-no-repeat bg-cover"
      style={{ backgroundImage: `url(${imageUrl})` }}
    >
      <CardHeader className="flex mt-auto space-y-0 p-5 text-white">
        <CardDescription className="text-xl text-white">{city}</CardDescription>
        <CardTitle className="text-2xl font-semibold">{name}</CardTitle>
      </CardHeader>
      <CardContent className="mt-auto items-center">
        <div className="flex gap-2">
          <button className="bg-white rounded-full p-2">
            <Eye size={20} strokeWidth={1.5} />
          </button>
          <button className="bg-yellow-300 rounded-full p-2 text-white">
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
