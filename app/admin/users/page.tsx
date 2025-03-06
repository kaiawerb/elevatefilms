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
import { User } from "@/types"
import { companies, users } from "@/database/schema"
import { desc, eq } from "drizzle-orm"
import { capitalizeFirstLetter } from "@/lib/utils"

const Page = async () => {
  const userList = await db
    .select({
      id: users.id,
      fullname: users.fullname,
      email: users.email,
      status: users.status,
      companyName: companies.name, // Apenas pega o nome da empresa
    })
    .from(users)
    .leftJoin(companies, eq(users.companyId, companies.id)) // Faz o join corretamente
    .limit(10)
    .orderBy(desc(users.createdAt))

  return (
    <section className="w-full rounded-2xl bg-white p-7">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl font-semibold">All Gears</h2>
        <Button className="bg-primary-admin" asChild>
          <Link href="/admin/gears/new" className="text-white">
            + New User
          </Link>
        </Button>
      </div>

      <div className="mt-7 w-full overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Date Joined</TableHead>
              <TableHead>Phone</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {userList.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.fullname}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{capitalizeFirstLetter(user.status)}</TableCell>
                <TableCell>{user.companyName}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  )
}

export default Page
