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
import { desc, eq } from "drizzle-orm"
import { redirect } from "next/navigation"

const Page = async () => {
  const session = await auth()

  if (!session) {
    redirect("/sign-in") // Redireciona para a página de login
    return null // Retorna null enquanto redireciona
  }

  const companiesList = (await db
    .select()
    .from(companies)
    .limit(10)
    .where(eq(companies.id, session.user.companyId))
    .orderBy(desc(companies.createdAt))) as Company[]

  return (
    <section className="w-full rounded-2xl bg-white p-7">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl font-semibold">Empresas</h2>
        <Button className="bg-primary-admin hover:bg-blue-700" asChild>
          <Link href="/admin/companies/new" className="text-white">
            + Nova Empresa
          </Link>
        </Button>
      </div>

      <div className="mt-7 w-full overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="text-sm font-bold">
              <TableHead>Name</TableHead>
              <TableHead>CNPJ</TableHead>
              <TableHead>E-mail</TableHead>
              <TableHead>Phone</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {companiesList.map((company) => (
              <TableRow className="text-sm font-bold" key={company.id}>
                <TableCell className="font-medium">{company.name}</TableCell>
                <TableCell>{company.cnpj}</TableCell>
                <TableCell>{company.email}</TableCell>
                <TableCell>{company.phone}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  )
}

export default Page
