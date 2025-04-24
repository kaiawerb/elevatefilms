import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import Image from "next/image"

type PropertyCardProps = {
  imageUrl: string
  name: string
  city: string
}

const PropertyCard = ({ imageUrl, name, city }: PropertyCardProps) => {
  return (
    <Card
      className="border-none flex justify-start min-h-[200px]"
      style={{ backgroundImage: `url(${imageUrl})` }}
    >
      <CardHeader className="flex mt-auto space-y-0 p-5 text-white">
        <CardDescription className="text-xl text-white">{city}</CardDescription>
        <CardTitle className="text-2xl font-semibold">{name}</CardTitle>
      </CardHeader>
    </Card>
  )
}

export default PropertyCard
