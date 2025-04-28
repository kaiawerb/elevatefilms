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
import { Company, CompanyParams } from "@/types"
import { companies } from "@/database/schema"
import { desc, eq } from "drizzle-orm"
import { redirect } from "next/navigation"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import Image from "next/image"
import config from "@/lib/config"
import { Eye, Pencil, Trash2 } from "lucide-react"
import { DeleteButton } from "@/components/DeleteButton"
import { deleteCompany } from "@/lib/admin/actions/companies/deleteCompany"

const Page = async () => {
  const session = await auth()

  if (!session) {
    redirect("/sign-in") // Redireciona para a página de login
    return null // Retorna null enquanto redireciona
  }

  const companiesList = await db
    .select()
    .from(companies)
    .limit(10)
    .where(eq(companies.id, session.user.companyId))
    .orderBy(desc(companies.createdAt))

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
            <TableRow className="text-sm font-bold bg-[#F8F8FF]/40 text-[#3A354E]">
              <TableHead>Nome</TableHead>
              <TableHead>CNPJ</TableHead>
              <TableHead>Telefone</TableHead>
              <TableHead>Cidade</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {companiesList.map((company) => (
              <TableRow
                className="text-sm font-semibold font-ibm-plex-sans mt-5 text-[#1E293B]"
                key={company.id}
              >
                <TableCell className="font-medium">
                  <div className="flex flex-row gap-2 items-center">
                    <Avatar>
                      <AvatarFallback className="bg-gray-200">
                        <Image
                          src={`${config.env.imagekit.urlEndpoint}${company.image}`}
                          alt={`Profile Image ${company.name}`}
                          width={40}
                          height={40}
                          className="object-cover rounded-full"
                        />
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col max-md:hidden">
                      <p className="font-semibold">{company.name}</p>
                      <p className="font-light">{company.email}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{company.cnpj}</TableCell>
                <TableCell>{company.phone}</TableCell>
                <TableCell>{company.city}</TableCell>
                <TableCell>
                  <div className="flex gap-1">
                    <button className="bg-slate-200 text-[#525252] rounded-full p-2">
                      <Link href="/admin/users/new">
                        <Eye size={20} strokeWidth={1.5} />
                      </Link>
                    </button>
                    <button className="bg-[#EFA350] rounded-full p-2 text-white">
                      <Pencil size={20} strokeWidth={1.5} />
                    </button>
                    <DeleteButton
                      deleteAction={deleteCompany}
                      id={company.id}
                      itemType="empresa"
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  )
}

export default Page
