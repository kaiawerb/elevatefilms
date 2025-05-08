import { Button } from "@/components/ui/button"
import Link from "next/link"
import React from "react"

import { auth } from "@/auth"
import { redirect } from "next/navigation"
import PropertyCard from "@/components/property/PropertyCard"

import dummyProperties from "@/dummyProperties.json"

const Page = async () => {
  const session = await auth()

  if (!session) {
    redirect("/sign-in") // Redireciona para a página de login
    return null // Retorna null enquanto redireciona
  }

  return (
    <section className="rounded-2xl bg-white p-7 max-w-screen">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl font-semibold">Imóveis</h2>
        <Button className="bg-primary-admin" asChild>
          <Link href="/admin/gears/new" className="text-white">
            + Novo Imóvel
          </Link>
        </Button>
      </div>

      <div className="mt-7 w-full overflow-hidden gap-3 flex flex-col">
        {dummyProperties.map((property) => (
          <PropertyCard
            key={property.id}
            imageUrl={property.image}
            name={property.title}
            city={property.city}
            id={property.id}
          />
        ))}
      </div>
    </section>
  )
}

export default Page
