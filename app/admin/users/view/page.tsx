import React from "react"

import { auth } from "@/auth"
import { redirect } from "next/navigation"
import PropertyCard from "@/components/property/PropertyCard"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const Page = async () => {
  const session = await auth()

  if (!session) {
    redirect("/sign-in") // Redireciona para a página de login
    return null // Retorna null enquanto redireciona
  }

  return (
    <section className="rounded-2xl bg-white p-8 ">
      <div className="overflow-hidden gap-3 flex flex-col">A</div>

      <div className="flex flex-row gap-6">
        <div className="w-full overflow-hidden gap-3 flex flex-col">a</div>

        <div className="w-2/4 overflow-hidden gap-6 flex flex-col">b</div>
      </div>
    </section>
  )
}

export default Page
