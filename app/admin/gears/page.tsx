import { Button } from "@/components/ui/button"
import Link from "next/link"
import React from "react"

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { db } from "@/database/drizzle"
import { Gear } from "@/types"
import { gears } from "@/database/schema"
import { desc, eq } from "drizzle-orm"

import config from "@/lib/config"
import Image from "next/image"
import { capitalizeFirstLetter } from "@/lib/utils"
import { auth } from "@/auth"
import { redirect } from "next/navigation"

const Page = async () => {
  const session = await auth()

  if (!session) {
    redirect("/sign-in") // Redireciona para a página de login
    return null // Retorna null enquanto redireciona
  }

  const gearList = (await db
    .select()
    .from(gears)
    .where(eq(gears.companyId, session.user.companyId)) // 🔹 Filtra pelos equipamentos da empresa do usuário
    .limit(10)) as Gear[]

  return (
    <section className="w-full rounded-2xl bg-white p-7">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl font-semibold">All Gears</h2>
        <Button className="bg-primary-admin" asChild>
          <Link href="/admin/gears/new" className="text-white">
            + New Gear
          </Link>
        </Button>
      </div>

      <div className="mt-7 w-full overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="text-sm font-bold">
              <TableHead>Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Brand</TableHead>
              <TableHead>Model</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {gearList.map((gearItem) => (
              <TableRow key={gearItem.id} className="text-sm font-semibold">
                <TableCell className="flex items-center gap-2 ">
                  <Image
                    src={`${config.env.imagekit.urlEndpoint}${gearItem.coverUrl}`}
                    alt="Gear Cover"
                    width={64}
                    height={64}
                    className="object-cover rounded-sm"
                  />
                  {gearItem.name}
                </TableCell>
                <TableCell>{capitalizeFirstLetter(gearItem.type)}</TableCell>
                <TableCell>
                  {gearItem.purchaseDate
                    ? gearItem.purchaseDate.toLocaleDateString()
                    : "N/A"}
                </TableCell>
                <TableCell>{gearItem.model}</TableCell>
                <TableCell>{capitalizeFirstLetter(gearItem.status)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  )
}

export default Page
