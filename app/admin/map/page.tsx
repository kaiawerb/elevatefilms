import { auth } from "@/auth"
import { redirect } from "next/navigation"
import MapPage from "./MapPage"
import { getCoordinates } from "@/lib/admin/actions/markers/getMarkers"

const Page = async () => {
  const session = await auth() // 🔹 Continua funcionando no Server Side

  if (!session) {
    redirect("/sign-in")
    return null
  }

  const coordinates = await getCoordinates()

  return <MapPage initialMarkers={coordinates} />
}

export default Page
