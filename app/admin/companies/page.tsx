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
import { auth } from "@/auth"
import { db } from "@/database/drizzle"
import { Company } from "@/types"
import { companies } from "@/database/schema"
import { desc } from "drizzle-orm"

const Page = async () => {
  const companiesList = (await db
    .select()
    .from(companies)
    .limit(10)
    .orderBy(desc(companies.createdAt))) as Company[]
    
  return (
    <section className="w-full rounded-2xl bg-white p-7">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl font-semibold">All Companies</h2>
        <Button className="bg-primary-admin" asChild>
          <Link href="/admin/companies/new" className="text-white">
            + New Companie
          </Link>
        </Button>
      </div>

      <div className="mt-7 w-full overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>CNPJ</TableHead>
              <TableHead>E-mail</TableHead>
              <TableHead>Phone</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {companiesList.map((company) => (
              <TableRow key={company.id}>
                <TableCell className="font-medium">{company.name}</TableCell>
                <TableCell>{company.cnpj}</TableCell>
                <TableCell>{company.email}</TableCell>
                <TableCell className="text-right">{company.phone}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  )
}

export default Page
