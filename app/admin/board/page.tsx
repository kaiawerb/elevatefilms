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
import BoardView from "@/components/board/notes/BoardView"

const Page = async () => {
  const session = await auth()

  if (!session) {
    redirect("/sign-in") // Redireciona para a página de login
    return null // Retorna null enquanto redireciona
  }

  return (
    <section className="rounded-2xl bg-white p-7 max-w-screen">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl font-semibold">All Gears</h2>
        <Button className="bg-primary-admin" asChild>
          <Link href="/admin/gears/new" className="text-white">
            + New Gear
          </Link>
        </Button>
      </div>

      <div className="mt-7 w-full overflow-hidden">
        <BoardView />
      </div>
    </section>
  )
}

export default Page
